import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lock, Star, ChevronDown } from "lucide-react";
import { PhoneMockup } from "../components/PhoneMockup";
import { DashboardScreen } from "../components/app-ui/DashboardScreen";
import { StoreBadges } from "../components/StoreBadges";
import { TextShield } from "../components/TextShield";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Local scroll just for hero parallax/fade. The travelling 3D is global.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      <div className="flex min-h-screen flex-col justify-center pt-28 md:pt-24">
        {/* Background glows (3D travels in the global canvas behind this) */}
        <div className="absolute inset-0 grid-bg mask-fade-b opacity-60" />
        <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand-600/25 blur-[140px]" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-accent-purple/20 blur-[120px]" />
        <div className="absolute left-0 top-72 h-72 w-72 rounded-full bg-accent-green/15 blur-[120px]" />

        <motion.div
          style={{ opacity: contentOpacity }}
          className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-5 lg:grid-cols-2"
        >
          {/* Copy */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={{ y: copyY }}
          >
            <motion.div
              variants={item}
              className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-slate-300"
            >
              <Star size={13} className="text-accent-amber" fill="#F59E0B" />
              Live on Google Play · App Store coming soon
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Take control of
              <br />
              your <span className="text-gradient">finances</span>
              <br />
              effortlessly.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-md text-lg leading-relaxed text-slate-300"
            >
              Budgetize is the private, offline-first money tracker. Log
              expenses in seconds, manage every account, and watch your spending
              come to life, all encrypted on your device.
            </motion.p>

            <motion.div variants={item} className="mt-8">
              <StoreBadges />
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400"
            >
              <span className="flex items-center gap-1.5">
                <Lock size={15} className="text-accent-green" />
                Bank-level encryption
              </span>
              <span className="hidden h-4 w-px bg-white/15 sm:block" />
              <span>No account needed</span>
              <span className="hidden h-4 w-px bg-white/15 sm:block" />
              <span>100% offline</span>
            </motion.div>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotateY: -18 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
            style={{ perspective: 1200 }}
          >
            <motion.div
              style={{ y: phoneY, rotate: phoneRotate }}
              className="animate-float"
            >
              <PhoneMockup>
                <DashboardScreen />
              </PhoneMockup>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400"
        >
          <span className="text-xs">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>
    </section>
  );
}
