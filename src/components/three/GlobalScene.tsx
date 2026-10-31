import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, RoundedBox } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { useScroll, useSpring, type MotionValue } from "framer-motion";
import type { Mesh, Group } from "three";
import { MathUtils, DoubleSide } from "three";
import {
  NOTE_SPECS,
  makeCoinTexture,
  makeNoteTexture,
} from "./moneyTextures";

/**
 * Persistent 3D canvas behind the whole page.
 *
 * Concept: a realistic credit card travels across the scroll while banknotes
 * (generic ₹/$/€ designs) and currency coins orbit and are gradually pulled
 * toward a focal point, implying "every bit of money is captured and tracked
 * in one place."
 *
 * The focal point sits on the right (where the phone lives). As scroll
 * progresses the orbit radius shrinks so objects converge inward.
 */

const FOCUS: [number, number, number] = [2.6, 0, 0];

/* ---------------- Credit card ---------------- */

function xPath(p: number): number {
  const pts = [3.0, -3.2, 2.8, -2.4, 0.4];
  const seg = 1 / (pts.length - 1);
  const i = Math.min(pts.length - 2, Math.floor(p / seg));
  const local = (p - i * seg) / seg;
  const e = local * local * (3 - 2 * local);
  return MathUtils.lerp(pts[i], pts[i + 1], e);
}

function CreditCard({ scroll }: { scroll: MotionValue<number> }) {
  const ref = useRef<Group>(null);
  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const p = scroll.get();
    const t = state.clock.elapsedTime;
    g.position.x = MathUtils.lerp(g.position.x, xPath(p), 0.08);
    g.position.y = MathUtils.lerp(g.position.y, Math.sin(p * Math.PI * 3) * 1.3, 0.08);
    g.position.z = MathUtils.lerp(g.position.z, -0.5 + Math.sin(p * Math.PI * 2) * 1.2, 0.08);
    g.rotation.y = p * Math.PI * 3 + t * 0.12;
    g.rotation.x = Math.sin(p * Math.PI * 2) * 0.45 + Math.cos(t * 0.3) * 0.08;
    g.rotation.z = Math.sin(p * Math.PI * 1.5) * 0.25;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.5}>
      <group ref={ref} position={[3, 0, -0.5]} scale={0.95}>
        {/* Card body */}
        <RoundedBox args={[3.3, 2.1, 0.08]} radius={0.14} smoothness={6}>
          <meshStandardMaterial
            color="#1f3a8a"
            metalness={0.85}
            roughness={0.25}
          />
        </RoundedBox>
        {/* Sheen panel */}
        <RoundedBox
          args={[3.3, 2.1, 0.09]}
          radius={0.14}
          smoothness={6}
          position={[0, 0, 0.001]}
        >
          <meshStandardMaterial
            color="#3b6fe0"
            metalness={1}
            roughness={0.15}
            transparent
            opacity={0.35}
          />
        </RoundedBox>
        {/* Chip */}
        <RoundedBox
          args={[0.44, 0.34, 0.05]}
          radius={0.05}
          smoothness={4}
          position={[-1.05, 0.42, 0.06]}
        >
          <meshStandardMaterial color="#e3b54a" metalness={1} roughness={0.3} />
        </RoundedBox>
        {/* Network mark: two overlapping circles (generic, not a real logo) */}
        <mesh position={[1.0, -0.6, 0.06]}>
          <circleGeometry args={[0.22, 32]} />
          <meshStandardMaterial color="#eb6a3a" metalness={0.4} roughness={0.4} />
        </mesh>
        <mesh position={[1.3, -0.6, 0.06]}>
          <circleGeometry args={[0.22, 32]} />
          <meshStandardMaterial color="#f2b33a" metalness={0.4} roughness={0.4} transparent opacity={0.85} />
        </mesh>
        {/* Number dots */}
        {[-1.0, -0.4, 0.2, 0.8].map((x) => (
          <mesh key={x} position={[x, -0.15, 0.06]}>
            <boxGeometry args={[0.32, 0.08, 0.02]} />
            <meshStandardMaterial color="#cdd8f5" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

/* ---------------- Banknote ---------------- */

function Note({
  kind,
  orbit,
  phase,
  speed,
  tilt,
  scroll,
}: {
  kind: keyof typeof NOTE_SPECS;
  orbit: number;
  phase: number;
  speed: number;
  tilt: number;
  scroll: MotionValue<number>;
}) {
  const ref = useRef<Mesh>(null);
  const tex = useMemo(() => makeNoteTexture(NOTE_SPECS[kind]), [kind]);

  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const p = scroll.get();
    const t = state.clock.elapsedTime;
    // Converge: orbit radius shrinks as the user scrolls.
    const r = orbit * (1 - p * 0.55);
    const a = phase + t * speed + p * Math.PI * 2;
    m.position.x = FOCUS[0] + Math.cos(a) * r;
    m.position.y = FOCUS[1] + Math.sin(a) * r * 0.6;
    m.position.z = FOCUS[2] + Math.sin(a * 0.7) * 1.2 - 1;
    m.rotation.x = t * 0.5 + tilt;
    m.rotation.y = a;
    m.rotation.z = Math.sin(t * 0.8 + phase) * 0.3;
  });

  return (
    <mesh ref={ref} scale={0.9}>
      <planeGeometry args={[1.1, 0.55]} />
      <meshStandardMaterial
        map={tex}
        side={DoubleSide}
        roughness={0.7}
        metalness={0.05}
      />
    </mesh>
  );
}

/* ---------------- Coin ---------------- */

function Coin({
  symbol,
  metal,
  orbit,
  phase,
  speed,
  scroll,
}: {
  symbol: string;
  metal: string;
  orbit: number;
  phase: number;
  speed: number;
  scroll: MotionValue<number>;
}) {
  const ref = useRef<Mesh>(null);
  const tex = useMemo(() => makeCoinTexture(symbol, metal), [symbol, metal]);

  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const p = scroll.get();
    const t = state.clock.elapsedTime;
    const r = orbit * (1 - p * 0.55);
    const a = phase - t * speed - p * Math.PI * 2;
    m.position.x = FOCUS[0] + Math.cos(a) * r;
    m.position.y = FOCUS[1] + Math.sin(a) * r * 0.6;
    m.position.z = FOCUS[2] + Math.cos(a * 0.6) * 1.1 - 1;
    m.rotation.y += 0.05;
    m.rotation.z = a;
  });

  return (
    <mesh ref={ref} scale={0.42}>
      <cylinderGeometry args={[1, 1, 0.14, 48]} />
      {/* side */}
      <meshStandardMaterial attach="material-0" color={metal} metalness={0.95} roughness={0.25} />
      {/* top / bottom faces carry the symbol texture */}
      <meshStandardMaterial attach="material-1" map={tex} metalness={0.9} roughness={0.3} />
      <meshStandardMaterial attach="material-2" map={tex} metalness={0.9} roughness={0.3} />
    </mesh>
  );
}

function Scene({ scroll }: { scroll: MotionValue<number> }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.7} />
      <pointLight position={[-5, -3, 2]} intensity={1.8} color="#8B5CF6" />
      <pointLight position={[5, 3, 3]} intensity={1.6} color="#3B82F6" />

      <CreditCard scroll={scroll} />

      {/* Banknotes flying + converging */}
      <Note kind="inr" orbit={4.2} phase={0.2} speed={0.35} tilt={0.3} scroll={scroll} />
      <Note kind="usd" orbit={3.4} phase={2.4} speed={0.42} tilt={1.1} scroll={scroll} />
      <Note kind="eur" orbit={3.9} phase={4.3} speed={0.3} tilt={2.0} scroll={scroll} />
      <Note kind="inr" orbit={2.8} phase={5.2} speed={0.5} tilt={0.8} scroll={scroll} />
      <Note kind="usd" orbit={4.6} phase={1.1} speed={0.28} tilt={1.6} scroll={scroll} />

      {/* Coins */}
      <Coin symbol="₹" metal="#d9a441" orbit={3.0} phase={1.0} speed={0.5} scroll={scroll} />
      <Coin symbol="$" metal="#c9cdd6" orbit={3.6} phase={3.1} speed={0.4} scroll={scroll} />
      <Coin symbol="€" metal="#d9a441" orbit={4.3} phase={5.0} speed={0.34} scroll={scroll} />

      <Environment preset="city" />
    </>
  );
}

export function GlobalScene() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.4,
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 42 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene scroll={smooth} />
        </Suspense>
      </Canvas>
    </div>
  );
}
