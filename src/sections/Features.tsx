import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FEATURES, type Feature } from "../data/content";
import { Reveal } from "../components/Reveal";

export function Features() {
  return (
    <section id="features" className="relative py-28">
      <div className="absolute inset-0 bg-ink-950/55 backdrop-blur-sm" />
      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-400">
            Everything you need
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Powerful features,{" "}
            <span className="text-gradient">zero complexity</span>
          </h2>
          <p className="mt-5 text-lg text-slate-400">
            Designed for people who want clarity over their money without
            spreadsheets, logins, or handing their data to anyone.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 0.08}>
              <FeatureCard feature={f} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 180,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 180,
    damping: 15,
  });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60 p-6 transition-colors duration-300 hover:border-white/20"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: feature.color, opacity: 0.18 }}
      />
      <div
        className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{ backgroundColor: feature.tint }}
      >
        <Icon size={24} style={{ color: feature.color }} />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-slate-400">
        {feature.description}
      </p>
    </motion.div>
  );
}
