import { lazy, Suspense } from "react";
import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { Highlights } from "./sections/Highlights";
import { Features } from "./sections/Features";
import { AppShowcase } from "./sections/AppShowcase";
import { Security } from "./sections/Security";
import { HowItWorks } from "./sections/HowItWorks";
import { CTA } from "./sections/CTA";
import { Footer } from "./sections/Footer";

const GlobalScene = lazy(() =>
  import("./components/three/GlobalScene").then((m) => ({
    default: m.GlobalScene,
  }))
);

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink-950">
      {/* Persistent 3D that travels across the whole scroll */}
      <Suspense fallback={null}>
        <GlobalScene />
      </Suspense>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Highlights />
          <Features />
          <AppShowcase />
          <Security />
          <HowItWorks />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
