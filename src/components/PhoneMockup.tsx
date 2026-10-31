import type { ReactNode } from "react";

interface PhoneMockupProps {
  children: ReactNode;
  className?: string;
  /**
   * On-screen scale of the whole device. The UI is always rendered at a real
   * phone width (390px) then scaled, so proportions match an actual device.
   */
  scale?: number;
  /**
   * When true, the inner screen does not capture wheel/scroll. Use this in the
   * scroll-driven showcase sections, where the screen content is revealed by
   * the page scroll, not by scrolling inside the phone. This lets the wheel
   * pass through to the page so hovering the phone never traps the scroll.
   * Defaults to false (free scrolling) for standalone mockups like the Hero.
   */
  lockScroll?: boolean;
}

const DEVICE_WIDTH = 390; // real iPhone logical width
const DEVICE_HEIGHT = 820; // screen area height

/**
 * A realistic phone frame that wraps live app UI (not a screenshot).
 * Content renders at true device dimensions and is scaled down as a whole,
 * so text and spacing read exactly like a real phone.
 */
export function PhoneMockup({
  children,
  className = "",
  scale = 0.72,
  lockScroll = false,
}: PhoneMockupProps) {
  // Outer wrapper reserves the scaled footprint so layout isn't thrown off.
  const frameW = DEVICE_WIDTH + 24; // + bezel padding
  const frameH = DEVICE_HEIGHT + 24;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: frameW * scale, height: frameH * scale }}
    >
      <div
        style={{
          width: frameW,
          height: frameH,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {/* Device body */}
        <div
          className="relative rounded-[3.5rem] p-[4px] shadow-phone"
          style={{
            width: frameW,
            height: frameH,
            background:
              "linear-gradient(160deg, #2b2f3a 0%, #0b0d12 35%, #060708 100%)",
          }}
        >
          {/* Titanium rim */}
          <div className="h-full rounded-[3.3rem] bg-[#15181f] p-[10px]">
            {/* Screen */}
            <div className="relative h-full overflow-hidden rounded-[2.7rem] bg-white">
              {/* Dynamic island */}
              <div className="pointer-events-none absolute left-1/2 top-3 z-30 h-8 w-32 -translate-x-1/2 rounded-full bg-black" />

              {/* Status bar */}
              <div className="relative z-20 flex items-center justify-between bg-white px-7 pt-4 pb-1 text-sm font-semibold text-gray-900">
                <span>9:41</span>
                <div className="flex items-center gap-2">
                  <SignalIcon />
                  <WifiIcon />
                  <BatteryIcon />
                </div>
              </div>

              {/* Live screen content. In lockScroll mode the wheel must pass
                  through to the page (content is page-scroll driven), so we
                  disable inner scrolling and pointer events on the scroller. */}
              <div
                className={`no-scrollbar relative ${
                  lockScroll
                    ? "overflow-hidden pointer-events-none"
                    : "overflow-y-auto overscroll-contain"
                }`}
                style={{
                  height: DEVICE_HEIGHT - 44,
                  scrollbarWidth: "none",
                }}
              >
                {children}
              </div>
            </div>
          </div>

          {/* Soft reflection */}
          <div className="pointer-events-none absolute inset-0 rounded-[3.5rem] bg-gradient-to-tr from-white/5 via-transparent to-white/10" />
        </div>
      </div>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg width="20" height="13" viewBox="0 0 17 11" fill="none">
      <rect x="0" y="7" width="3" height="4" rx="1" fill="#111827" />
      <rect x="4.5" y="5" width="3" height="6" rx="1" fill="#111827" />
      <rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="#111827" />
      <rect x="13.5" y="0" width="3" height="11" rx="1" fill="#111827" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="19" height="13" viewBox="0 0 16 11" fill="none">
      <path d="M8 10.5 10.2 8a3.1 3.1 0 0 0-4.4 0L8 10.5Z" fill="#111827" />
      <path
        d="M8 2C5.2 2 2.6 3 .7 4.9l1.4 1.4A8 8 0 0 1 8 4a8 8 0 0 1 5.9 2.3l1.4-1.4A11 11 0 0 0 8 2Z"
        fill="#111827"
        opacity="0.9"
      />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="28" height="14" viewBox="0 0 25 12" fill="none">
      <rect
        x="0.5"
        y="0.5"
        width="21"
        height="11"
        rx="3"
        stroke="#111827"
        opacity="0.4"
      />
      <rect x="2" y="2" width="17" height="8" rx="1.8" fill="#111827" />
      <rect x="23" y="4" width="1.8" height="4" rx="0.9" fill="#111827" />
    </svg>
  );
}
