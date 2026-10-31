import { CanvasTexture, SRGBColorSpace, type Texture } from "three";

/**
 * Procedurally generated money textures.
 *
 * NOTE: These are intentionally generic, stylised designs. They are NOT
 * reproductions of real banknotes, currency artwork, or any brand/network
 * logos, which avoids trademark and currency-reproduction issues on a public
 * marketing site while still reading instantly as "money".
 */

interface NoteSpec {
  symbol: string;
  denom: string;
  code: string;
  base: string; // main paper tint
  ink: string; // print colour
  accent: string;
}

export const NOTE_SPECS: Record<"inr" | "usd" | "eur", NoteSpec> = {
  inr: { symbol: "₹", denom: "500", code: "INR", base: "#e8e2d2", ink: "#4b5e52", accent: "#8a9a5b" },
  usd: { symbol: "$", denom: "100", code: "USD", base: "#dce7da", ink: "#2f5d3a", accent: "#4f8a5b" },
  eur: { symbol: "€", denom: "50", code: "EUR", base: "#f0e4c8", ink: "#9a5a2a", accent: "#d08a3a" },
};

function rounded(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Builds a stylised banknote face texture. */
export function makeNoteTexture(spec: NoteSpec): Texture {
  const W = 512;
  const H = 256;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;

  // Paper
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, spec.base);
  g.addColorStop(1, shade(spec.base, -12));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // Guilloché-style concentric border
  ctx.strokeStyle = hexWithAlpha(spec.accent, 0.5);
  ctx.lineWidth = 2;
  for (let i = 0; i < 4; i++) {
    rounded(ctx, 10 + i * 5, 10 + i * 5, W - 20 - i * 10, H - 20 - i * 10, 14);
    ctx.stroke();
  }

  // Faint rosette pattern
  ctx.strokeStyle = hexWithAlpha(spec.ink, 0.12);
  ctx.lineWidth = 1;
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 14) {
    ctx.beginPath();
    ctx.ellipse(W / 2, H / 2, 70, 34, a, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Big denomination
  ctx.fillStyle = spec.ink;
  ctx.font = "bold 120px Georgia, serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(spec.symbol, 34, H / 2);

  ctx.font = "bold 92px Georgia, serif";
  ctx.textAlign = "right";
  ctx.fillText(spec.denom, W - 34, H / 2);

  // Code + corners
  ctx.font = "bold 26px Arial, sans-serif";
  ctx.fillStyle = hexWithAlpha(spec.ink, 0.85);
  ctx.textAlign = "center";
  ctx.fillText(spec.code, W / 2, 40);
  ctx.fillText(spec.denom, W / 2, H - 36);

  // Portrait-ish oval seal
  ctx.strokeStyle = hexWithAlpha(spec.ink, 0.5);
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(W / 2, H / 2, 46, 58, 0, 0, Math.PI * 2);
  ctx.stroke();

  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Builds a coin face texture with a currency symbol. */
export function makeCoinTexture(symbol: string, metal: string): Texture {
  const S = 256;
  const c = document.createElement("canvas");
  c.width = S;
  c.height = S;
  const ctx = c.getContext("2d")!;

  const g = ctx.createRadialGradient(S / 2, S / 2, 20, S / 2, S / 2, S / 2);
  g.addColorStop(0, shade(metal, 22));
  g.addColorStop(1, shade(metal, -18));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, S / 2 - 4, 0, Math.PI * 2);
  ctx.fill();

  // rim
  ctx.strokeStyle = shade(metal, -30);
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, S / 2 - 14, 0, Math.PI * 2);
  ctx.stroke();

  // symbol
  ctx.fillStyle = shade(metal, -38);
  ctx.font = "bold 150px Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(symbol, S / 2, S / 2 + 6);

  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// ---- small colour helpers ----
function shade(hex: string, amt: number): string {
  const { r, g, b } = hexToRgb(hex);
  const f = (v: number) => Math.max(0, Math.min(255, Math.round(v + amt)));
  return `rgb(${f(r)}, ${f(g)}, ${f(b)})`;
}
function hexWithAlpha(hex: string, a: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  const n = Number.parseInt(
    h.length === 3
      ? h.split("").map((x) => x + x).join("")
      : h,
    16
  );
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
