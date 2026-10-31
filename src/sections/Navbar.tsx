import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { APP } from "../data/content";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Preview", href: "#preview" },
  { label: "Security", href: "#security" },
  { label: "How it works", href: "#how" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <a
          href="#top"
          className={`flex items-center gap-2.5 rounded-2xl px-3 py-2 transition-all ${
            scrolled ? "glass" : ""
          }`}
        >
          <img
            src="/app-icon.png"
            alt="Budgetize"
            className="h-8 w-8 rounded-lg"
          />
          <span className="text-lg font-bold text-white">{APP.name}</span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full glass px-2 py-1.5 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={APP.playStoreUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-brand-500 hover:shadow-glow"
        >
          Download
        </a>
      </div>
    </motion.header>
  );
}
