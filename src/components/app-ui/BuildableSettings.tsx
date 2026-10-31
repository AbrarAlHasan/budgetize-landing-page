import { motion } from "framer-motion";
import {
  CloudUpload,
  Check,
  Palette,
  Globe,
  Tags,
  Lock,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { Piece } from "./Piece";

interface BuildableSettingsProps {
  /** Index of the highest step currently revealed (-1 = empty). */
  activeStep: number;
}

const PREFERENCES: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: Palette, label: "Appearance", value: "System" },
  { icon: Globe, label: "Currency", value: "USD $" },
  { icon: Tags, label: "Categories", value: "12 active" },
];

/**
 * The Settings screen, assembled piece by piece. Highlights the Google Drive
 * backup card. Reuses the shared <Piece> reveal mechanic.
 */
export function BuildableSettings({ activeStep }: Readonly<BuildableSettingsProps>) {
  return (
    <div className="min-h-full bg-gray-50 px-5 pb-10 pt-5">
      {/* 0 — header */}
      <Piece index={0} activeStep={activeStep}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold leading-tight text-gray-900">
            Settings
          </h1>
          <p className="text-[13px] text-gray-500">Manage your workspace</p>
        </div>
      </Piece>

      {/* 1 — Google Drive backup */}
      <Piece index={1} activeStep={activeStep}>
        <div className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center gap-3 p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E8F0FE]">
              <CloudUpload size={22} className="text-[#1A73E8]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-gray-900">
                Google Drive Backup
              </p>
              <p className="text-[11px] text-gray-500">
                Encrypted, synced to your own Drive
              </p>
            </div>
            {/* on toggle */}
            <div className="flex h-6 w-11 items-center rounded-full bg-brand-600 px-0.5">
              <motion.span
                className="h-5 w-5 rounded-full bg-white shadow"
                initial={{ x: 0 }}
                animate={{ x: activeStep >= 1 ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-gray-100 bg-green-50/60 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <Check size={13} className="text-green-600" />
              <span className="text-[11px] font-medium text-green-700">
                Last backup: Today, 9:41 AM
              </span>
            </div>
            <span className="text-[11px] font-semibold text-brand-600">
              Back up now
            </span>
          </div>
        </div>
      </Piece>

      {/* 2 — preferences */}
      <Piece index={2} activeStep={activeStep}>
        <h2 className="mb-3 text-base font-bold text-gray-900">Preferences</h2>
        <div className="mb-6 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {PREFERENCES.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 p-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                <Icon size={17} className="text-gray-600" />
              </div>
              <span className="flex-1 text-[13px] font-medium text-gray-800">
                {label}
              </span>
              <span className="text-[12px] text-gray-500">{value}</span>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          ))}
        </div>
      </Piece>

      {/* 3 — security */}
      <Piece index={3} activeStep={activeStep}>
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EDE9FE]">
              <Lock size={20} className="text-[#7C3AED]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-gray-900">
                App Lock & Encryption
              </p>
              <p className="text-[11px] text-gray-500">
                Face ID + on-device encrypted notes
              </p>
            </div>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
              On
            </span>
          </div>
        </div>
      </Piece>
    </div>
  );
}
