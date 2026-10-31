import { APP } from "../data/content";

interface StoreBadgesProps {
  className?: string;
}

export function StoreBadges({ className = "" }: StoreBadgesProps) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {/* Google Play - live */}
      <a
        href={APP.playStoreUrl}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-3 rounded-2xl bg-white px-5 py-3 text-black shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-glow"
      >
        <GooglePlayIcon />
        <span className="text-left">
          <span className="block text-[10px] uppercase tracking-wide text-gray-500">
            Get it on
          </span>
          <span className="block text-base font-semibold leading-tight">
            Google Play
          </span>
        </span>
      </a>

      {/* App Store - coming soon */}
      <div className="relative flex cursor-default items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-white/70">
        <AppleIcon />
        <span className="text-left">
          <span className="block text-[10px] uppercase tracking-wide text-white/40">
            Coming soon to
          </span>
          <span className="block text-base font-semibold leading-tight">
            App Store
          </span>
        </span>
        <span className="absolute -right-2 -top-2 rounded-full bg-accent-amber px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-black">
          Soon
        </span>
      </div>
    </div>
  );
}

function GooglePlayIcon() {
  return (
    <svg width="26" height="28" viewBox="0 0 512 512" aria-hidden>
      <path
        fill="#00D2FF"
        d="M47 24C38 29 33 38 33 50v412c0 12 5 21 14 26l240-232L47 24z"
      />
      <path
        fill="#00E676"
        d="M47 24l240 232 66-64L94 14C76 4 59 11 47 24z"
      />
      <path
        fill="#FFC400"
        d="M353 192l-66 64 66 64 97-53c20-11 20-31 0-42l-97-33z"
      />
      <path
        fill="#FF3D47"
        d="M47 488c12 13 29 20 47 10l259-162-66-64L47 488z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="24" height="28" viewBox="0 0 384 512" fill="currentColor" aria-hidden>
      <path d="M318.7 268c-.2-37 16.5-64.9 50.3-85.6-18.9-27.1-47.5-42-85.1-44.9-35.6-2.8-74.6 20.9-88.8 20.9-15 0-49.5-19.9-76.7-19.9C55.4 138.9 0 182.4 0 271c0 26.2 4.8 53.3 14.4 81.1 12.8 36.5 59 126 107.2 124.5 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.7 17.9 48.6-.7 90.4-82 102.6-118.6-65.2-30.7-61.9-90-61.9-90zM256.6 94.8c22.7-27 20.6-61.6 20-74-20.1 1.2-43.4 13.8-56.6 29.5-14.6 16.8-23.2 37.5-21.4 61.3 21.7 1.7 41.5-9.4 58-16.8z" />
    </svg>
  );
}
