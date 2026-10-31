import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { PhoneMockup } from "./PhoneMockup";

export interface ShowcaseStep {
  icon: LucideIcon;
  tag: string;
  title: string;
  text: string;
  color: string;
}

interface ShowcaseSectionProps {
  /** Anchor id for in-page navigation. */
  id: string;
  /** Small uppercase label above the heading. */
  eyebrow: string;
  /** Heading rendered above the step copy (ReactNode so you can style spans). */
  heading: ReactNode;
  /** Copy shown before the first piece is revealed. */
  intro: string;
  /** Ordered step descriptions, synced to the screen pieces. */
  steps: ShowcaseStep[];
  /** Renders the phone screen for the current active step (-1 = empty). */
  renderScreen: (activeStep: number) => ReactNode;
}

/**
 * Reusable scroll-driven showcase. Pins the viewport, slides a phone in, and
 * reveals `steps` one at a time while the matching description animates on the
 * left. The phone's screen is supplied via `renderScreen` so any "buildable"
 * screen (Dashboard, Reports, Settings, Notifications...) can reuse the exact
 * same animation and layout.
 */
export function ShowcaseSection({
  id,
  eyebrow,
  heading,
  intro,
  steps,
  renderScreen,
}: Readonly<ShowcaseSectionProps>) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);

  // Responsive phone scale. On narrow / short screens the full-height phone
  // (~844px tall at scale 1) won't fit the pinned viewport once the heading is
  // stacked above it, which clipped the top of the device. We scale the phone
  // down to whatever the available height allows so the whole device stays
  // visible. Desktop keeps the original 0.72.
  const [phoneBaseScale, setPhoneBaseScale] = useState(0.72);

  useEffect(() => {
    const PHONE_FRAME_HEIGHT = 844; // 820 screen + 24 bezel, at scale 1
    const computeScale = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (vw >= 1024) {
        // lg and up: side-by-side layout, phone has the full column height.
        setPhoneBaseScale(0.72);
        return;
      }
      // Mobile / tablet (stacked): reserve room for navbar + compact heading
      // and keep the phone within the remaining height.
      const reserved = 200; // navbar + eyebrow/heading + padding
      const available = Math.max(vh - reserved, 320);
      const fitScale = available / PHONE_FRAME_HEIGHT;
      // Clamp so it never gets larger than desktop or uselessly small.
      setPhoneBaseScale(Math.min(0.62, Math.max(0.42, fitScale)));
    };
    computeScale();
    window.addEventListener("resize", computeScale, { passive: true });
    return () => window.removeEventListener("resize", computeScale);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // First ~12% is the phone appearing empty, remaining splits across steps.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p < 0.12) {
      setActive(-1);
      return;
    }
    const t = (p - 0.12) / 0.8; // 0..1 across the build
    const step = Math.min(steps.length - 1, Math.floor(t * steps.length));
    setActive(step);
  });

  // Phone entrance: slide + scale only; opacity stays 1 so the screen never
  // looks faded while the UI is still assembling.
  const phoneY = useTransform(scrollYProgress, [0, 0.1], [80, 0]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.1], [0.92, 1]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative"
      style={{ height: `${steps.length * 70 + 120}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-16 lg:pt-0">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-5 lg:grid-cols-2 lg:gap-10">
          {/* LEFT — descriptions synced to the active piece. On mobile the
              heading sits above the phone so the device has the lower, taller
              part of the viewport and never gets clipped under the navbar. */}
          <div className="relative order-1">
            <div className="mb-4 lg:mb-8">
              <span className="text-sm font-semibold uppercase tracking-widest text-brand-400">
                {eyebrow}
              </span>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl lg:mt-3 lg:text-4xl">
                {heading}
              </h2>
            </div>

            <div className="relative hidden min-h-[220px] lg:block">
              <AnimatePresence mode="wait">
                {active < 0 ? (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4 }}
                    className="text-lg text-slate-400"
                  >
                    {intro}
                  </motion.div>
                ) : (
                  <StepPanel key={active} step={steps[active]} />
                )}
              </AnimatePresence>
            </div>

            {/* progress dots */}
            <div className="mt-4 flex gap-2 lg:mt-10">
              {steps.map((s, i) => (
                <span
                  key={s.tag}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 28 : 10,
                    backgroundColor:
                      i <= active ? s.color : "rgba(148,163,184,0.25)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — the phone assembling. z-20 keeps it above the global 3D
              so nothing shows through / washes out the screen. */}
          <motion.div
            style={{ y: phoneY, scale: phoneScale }}
            className="relative z-20 order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Opaque stage panel so the travelling 3D never bleeds over or
                  washes out the phone while the screen is assembling. Kept
                  close to the device so it hugs the frame instead of poking
                  out past it. */}
              <div className="absolute -inset-x-4 -inset-y-6 -z-10 rounded-[3rem] bg-ink-950/90 backdrop-blur-md" />
              <PhoneMockup lockScroll scale={phoneBaseScale}>
                {renderScreen(active)}
              </PhoneMockup>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StepPanel({ step }: { step: ShowcaseStep }) {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{ backgroundColor: `${step.color}1f` }}
      >
        <Icon size={26} style={{ color: step.color }} />
      </div>
      <span
        className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-bold"
        style={{ color: step.color, backgroundColor: `${step.color}1f` }}
      >
        {step.tag}
      </span>
      <h3 className="text-2xl font-bold text-white sm:text-3xl">{step.title}</h3>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-400">
        {step.text}
      </p>
    </motion.div>
  );
}
