import { HIGHLIGHTS } from "../data/content";
import { Reveal } from "../components/Reveal";

export function Highlights() {
  return (
    <section className="relative border-y border-white/10 bg-ink-900/60 py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:grid-cols-2 lg:grid-cols-4">
        {HIGHLIGHTS.map((h, i) => {
          const Icon = h.icon;
          return (
            <Reveal key={h.label} delay={i * 0.08}>
              <div className="flex flex-col items-center text-center">
                <div
                  className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${h.color}1f` }}
                >
                  <Icon size={22} style={{ color: h.color }} />
                </div>
                <span className="text-3xl font-extrabold text-white">
                  {h.value}
                </span>
                <span className="mt-1 text-sm text-slate-400">{h.label}</span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
