import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import {
  LayoutDashboard,
  Scale,
  TrendingUp,
  BarChart3,
  Zap,
  ListChecks,
  type LucideIcon,
} from "lucide-react";
import { PhoneMockup } from "../components/PhoneMockup";
import { BuildableDashboard } from "../components/app-ui/BuildableDashboard";

interface StepCopy {
  icon: LucideIcon;
  tag: string;
  title: string;
  text: string;
  color: string;
}

const STEPS: StepCopy[] = [
  {
    icon: LayoutDashboard,
    tag: "Header",
    title: "Your month, at the top",
    text: "Open the app and you're instantly oriented, the current month and a one-tap filter to slice your data any way you like.",
    color: "#3B82F6",
  },
  {
    icon: Scale,
    tag: "Summary cards",
    title: "Income vs. expense, instantly",
    text: "Two glanceable cards show exactly what came in and what went out this month, colour-coded so you read it in a second.",
    color: "#10B981",
  },
  {
    icon: TrendingUp,
    tag: "Net amount",
    title: "Are you actually ahead?",
    text: "The net card does the math for you, how much you kept this month, with your transaction count right beneath it.",
    color: "#22C55E",
  },
  {
    icon: BarChart3,
    tag: "Spending velocity",
    title: "Spot trends before they bite",
    text: "A live velocity chart shows how fast you're spending across the month, with an 'on track' signal so nothing surprises you.",
    color: "#F59E0B",
  },
  {
    icon: Zap,
    tag: "Quick actions",
    title: "Log it in two taps",
    text: "Add an expense or a new account right from the home screen. No digging through menus, capture it before you forget.",
    color: "#8B5CF6",
  },
  {
    icon: ListChecks,
    tag: "Recent activity",
    title: "Every transaction, organised",
    text: "Your latest activity with categories, tags, accounts and encrypted notes, each one tappable to edit or duplicate.",
    color: "#EF4444",
  },
];

export function AppShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);

  // Progress through the pinned section.
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
    const step = Math.min(STEPS.length - 1, Math.floor(t * STEPS.length));
    setActive(step);
  });

  // Phone entrance: slide + scale only. Opacity stays 1 the whole time so the
  // screen never looks faded while the dashboard is still assembling.
  const phoneY = useTransform(scrollYProgress, [0, 0.1], [80, 0]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.1], [0.92, 1]);

  return (
    <section
      id="preview"
      ref={sectionRef}
      className="relative"
      style={{ height: `${STEPS.length * 70 + 120}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 lg:grid-cols-2">
          {/* LEFT — descriptions synced to the active piece */}
          <div className="relative order-2 lg:order-1">
            <div className="mb-8">
              <span className="text-sm font-semibold uppercase tracking-widest text-brand-400">
                Watch it come together
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                The dashboard,{" "}
                <span className="text-gradient">built piece by piece</span>
              </h2>
            </div>

            <div className="relative min-h-[220px]">
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
                    Keep scrolling, the phone powers on and the real Budgetize
                    home screen assembles itself, one component at a time.
                  </motion.div>
                ) : (
                  <StepPanel key={active} step={STEPS[active]} />
                )}
              </AnimatePresence>
            </div>

            {/* progress dots */}
            <div className="mt-10 flex gap-2">
              {STEPS.map((s, i) => (
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
            className="relative z-20 order-1 flex justify-center lg:order-2 lg:justify-end"
          >
            <div className="relative">
              {/* Opaque stage panel so the travelling 3D never bleeds over or
                  washes out the phone while the dashboard is assembling. */}
              <div className="absolute -inset-x-10 -inset-y-12 -z-10 rounded-[3rem] bg-ink-950/90 backdrop-blur-md" />
              <div className="absolute inset-0 -z-10 translate-y-10 scale-90 rounded-full bg-brand-600/25 blur-3xl" />
              <PhoneMockup>
                <BuildableDashboard activeStep={active} />
              </PhoneMockup>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StepPanel({ step }: { step: StepCopy }) {
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
      <h3 className="text-2xl font-bold text-white sm:text-3xl">
        {step.title}
      </h3>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-400">
        {step.text}
      </p>
    </motion.div>
  );
}
