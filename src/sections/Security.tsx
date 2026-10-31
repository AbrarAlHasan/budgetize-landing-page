import { ShieldCheck, Lock, WifiOff, KeyRound } from "lucide-react";
import { Reveal } from "../components/Reveal";

const POINTS = [
  {
    icon: Lock,
    title: "AES encryption on-device",
    text: "Amounts, notes and payment details are encrypted with a key held in your device's secure store.",
  },
  {
    icon: WifiOff,
    title: "No servers, no tracking",
    text: "Budgetize is offline-first. Your data never has to leave your phone unless you choose to back it up.",
  },
  {
    icon: KeyRound,
    title: "You hold the keys",
    text: "There's no account to hack. Your encryption key lives only with you.",
  },
];

export function Security() {
  return (
    <section id="security" className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-ink-800/80 to-ink-900/80 p-8 md:p-14">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent-green/20 blur-[120px]" />
          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent-green/10 px-4 py-1.5 text-xs font-semibold text-accent-green">
                <ShieldCheck size={14} />
                Privacy by design
              </div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Your money data stays{" "}
                <span className="text-gradient-green">yours</span>
              </h2>
              <p className="mt-5 text-lg text-slate-400">
                We built Budgetize local-first so you never trade privacy for
                convenience. No logins, no cloud lock-in, no selling your
                financial life to advertisers.
              </p>
            </Reveal>

            <div className="space-y-4">
              {POINTS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Reveal key={p.title} delay={i * 0.1}>
                    <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-green/15">
                        <Icon size={20} className="text-accent-green" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{p.title}</h3>
                        <p className="mt-1 text-sm text-slate-400">{p.text}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
