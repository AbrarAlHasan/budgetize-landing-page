import { motion } from "framer-motion";
import { PhoneMockup } from "../components/PhoneMockup";
import { DashboardScreen } from "../components/app-ui/DashboardScreen";
import { StoreBadges } from "../components/StoreBadges";
import { Reveal } from "../components/Reveal";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/20 blur-[160px]" />
      <div className="relative mx-auto max-w-5xl px-5">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-brand-700/40 via-ink-900/80 to-ink-950 p-8 text-center md:p-16">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:text-left">
            <div>
              <Reveal>
                <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                  Start spending{" "}
                  <span className="text-gradient">smarter</span> today.
                </h2>
                <p className="mx-auto mt-5 max-w-lg text-lg text-slate-300 md:mx-0">
                  It's free, it's private, and it works the second you open it.
                  Download Budgetize and take back control of your money.
                </p>
                <div className="mt-8 flex justify-center md:justify-start">
                  <StoreBadges />
                </div>
              </Reveal>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="hidden justify-center md:flex"
            >
              <div className="animate-float scale-90">
                <PhoneMockup>
                  <DashboardScreen />
                </PhoneMockup>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
