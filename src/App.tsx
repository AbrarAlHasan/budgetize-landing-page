import { lazy, Suspense, useEffect, useState } from "react";
import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { Highlights } from "./sections/Highlights";
import { Features } from "./sections/Features";
import { AppShowcase } from "./sections/AppShowcase";
import { ReportsShowcase } from "./sections/ReportsShowcase";
import { SettingsShowcase } from "./sections/SettingsShowcase";
import { NotificationsShowcase } from "./sections/NotificationsShowcase";
import { ExchangeShowcase } from "./sections/ExchangeShowcase";
import { Security } from "./sections/Security";
import { HowItWorks } from "./sections/HowItWorks";
import { CTA } from "./sections/CTA";
import { Footer } from "./sections/Footer";

const GlobalScene = lazy(() =>
  import("./components/three/GlobalScene").then((m) => ({
    default: m.GlobalScene,
  }))
);

/**
 * The 3D background is a decorative flourish that pulls in the heavy
 * three.js bundle + an HDR environment map. On mobile that blocked the first
 * paint (long blank screen) for little benefit on a small screen, so we only
 * mount it on larger viewports and only after the first paint, so the page
 * content always renders immediately.
 */
function useEnable3DScene(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isDesktop || reducedMotion) return;

    // Defer mounting until the browser is idle so the page paints first.
    const enable = () => setEnabled(true);
    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle
      ? window.requestIdleCallback(enable)
      : window.setTimeout(enable, 300);

    return () => {
      if (hasIdle) {
        window.cancelIdleCallback(handle as number);
      } else {
        window.clearTimeout(handle as ReturnType<typeof setTimeout>);
      }
    };
  }, []);

  return enabled;
}

export default function App() {
  const show3D = useEnable3DScene();

  return (
    <div className="relative min-h-screen bg-ink-950">
      {/* Persistent 3D that travels across the whole scroll. Desktop-only and
          deferred so it never blocks the initial render (especially mobile). */}
      {show3D && (
        <Suspense fallback={null}>
          <GlobalScene />
        </Suspense>
      )}

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Highlights />
          <Features />
          <AppShowcase />
          <ReportsShowcase />
          <SettingsShowcase />
          <NotificationsShowcase />
          <ExchangeShowcase />
          <Security />
          <HowItWorks />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
