import { motion } from "framer-motion";
import {
  Bell,
  AlertTriangle,
  CalendarClock,
  PiggyBank,
  CloudUpload,
  type LucideIcon,
} from "lucide-react";
import { Piece } from "./Piece";

interface BuildableNotificationsProps {
  /** Index of the highest step currently revealed (-1 = empty). */
  activeStep: number;
}

interface NotifItem {
  icon: LucideIcon;
  tint: string;
  color: string;
  title: string;
  body: string;
  time: string;
}

const NOTIFS: NotifItem[] = [
  {
    icon: AlertTriangle,
    tint: "#FEE2E2",
    color: "#EF4444",
    title: "Budget alert: Dining",
    body: "You've used 92% of your $400 dining budget this month.",
    time: "2m ago",
  },
  {
    icon: CalendarClock,
    tint: "#FEF3C7",
    color: "#F59E0B",
    title: "Bill due tomorrow",
    body: "Electricity bill of $86.40 is scheduled for Nov 1.",
    time: "1h ago",
  },
  {
    icon: PiggyBank,
    tint: "#D1FAE5",
    color: "#10B981",
    title: "Savings goal hit",
    body: "Nice! You reached your 'Emergency Fund' target of $5,000.",
    time: "Today",
  },
];

/**
 * The Notifications screen, assembled piece by piece. Reuses the shared
 * <Piece> reveal mechanic so it animates just like the other screens.
 */
export function BuildableNotifications({
  activeStep,
}: Readonly<BuildableNotificationsProps>) {
  return (
    <div className="min-h-full bg-gray-50 px-5 pb-10 pt-5">
      {/* 0 — header */}
      <Piece index={0} activeStep={activeStep}>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold leading-tight text-gray-900">
              Notifications
            </h1>
            <p className="text-[13px] text-gray-500">Stay on top of money</p>
          </div>
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
            <Bell size={18} className="text-brand-500" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent-red" />
          </div>
        </div>
      </Piece>

      {/* 1 — smart alert cards */}
      {NOTIFS.map((n, i) => (
        <Piece key={n.title} index={1 + i} activeStep={activeStep}>
          <NotifRow item={n} />
        </Piece>
      ))}

      {/* 4 — quiet hours / backup reminder */}
      <Piece index={1 + NOTIFS.length} activeStep={activeStep}>
        <div className="mt-2 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E8F0FE]">
              <CloudUpload size={20} className="text-[#1A73E8]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-gray-900">
                Weekly backup reminder
              </p>
              <p className="text-[11px] text-gray-500">
                Every Sunday at 9:00 AM to Google Drive
              </p>
            </div>
            <div className="flex h-6 w-11 items-center rounded-full bg-brand-600 px-0.5">
              <motion.span
                className="h-5 w-5 rounded-full bg-white shadow"
                initial={{ x: 0 }}
                animate={{ x: activeStep >= 1 + NOTIFS.length ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </div>
          </div>
        </div>
      </Piece>
    </div>
  );
}

function NotifRow({ item }: Readonly<{ item: NotifItem }>) {
  const Icon = item.icon;
  return (
    <div className="mb-2.5 flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: item.tint }}
      >
        <Icon size={18} style={{ color: item.color }} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[13px] font-semibold text-gray-900">
            {item.title}
          </p>
          <span className="shrink-0 text-[10px] text-gray-400">
            {item.time}
          </span>
        </div>
        <p className="mt-0.5 text-[11px] leading-relaxed text-gray-500">
          {item.body}
        </p>
      </div>
    </div>
  );
}
