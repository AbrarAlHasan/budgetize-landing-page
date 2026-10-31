import { STEPS } from "../data/content";
import { Reveal } from "../components/Reveal";

export function HowItWorks() {
  return (
    <section id="how" className="relative py-28">
      <div className="absolute inset-0 bg-ink-950/55 backdrop-blur-sm" />
      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            Get started in minutes
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Three steps to{" "}
            <span className="text-gradient">clarity</span>
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.number} delay={i * 0.12}>
              <div className="relative rounded-3xl border border-white/10 bg-ink-800/60 p-7 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-2xl font-bold text-white shadow-glow">
                  {s.number}
                </div>
                <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {s.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
