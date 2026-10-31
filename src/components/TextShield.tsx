import type { ReactNode } from "react";

interface TextShieldProps {
  children: ReactNode;
  className?: string;
  /** How dark the pool is at its center (0..1). */
  strength?: number;
}

/**
 * Keeps text readable when the 3D passes behind it.
 *
 * Renders a soft, edge-fading radial scrim directly behind the content. It has
 * no visible border or box, it's a blurred pool of darkness anchored to the
 * text that fades to fully transparent, so it reads as ambient depth rather
 * than a pasted-on background.
 */
export function TextShield({
  children,
  className = "",
  strength = 0.55,
}: TextShieldProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Scrim: wider than the text, blurred, radial fade to transparent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10"
        style={{
          background: `radial-gradient(60% 60% at 40% 50%, rgba(5,7,13,${strength}) 0%, rgba(5,7,13,${strength * 0.6}) 45%, rgba(5,7,13,0) 78%)`,
          filter: "blur(16px)",
        }}
      />
      {children}
    </div>
  );
}
