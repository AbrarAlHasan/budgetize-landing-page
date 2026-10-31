import type { LucideIcon } from "lucide-react";
import {
  Wallet,
  PieChart,
  ShieldCheck,
  CreditCard,
  Tags,
  BarChart3,
  WifiOff,
  Zap,
  Moon,
  TrendingUp,
  CloudUpload,
  ScanLine,
} from "lucide-react";

export const APP = {
  name: "Budgetize",
  tagline: "Take control of your money.",
  version: "1.0.17",
  playStoreUrl:
    "https://play.google.com/store/apps/details?id=com.budgetize.app",
  appStoreComingSoon: true,
};

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string; // hex
  tint: string; // soft bg
}

export const FEATURES: Feature[] = [
  {
    icon: WifiOff,
    title: "Works 100% Offline",
    description:
      "No account, no internet, no waiting. Your money data lives on your device and is ready the instant you open the app.",
    color: "#3B82F6",
    tint: "rgba(59,130,246,0.12)",
  },
  {
    icon: ShieldCheck,
    title: "Bank-Level Encryption",
    description:
      "Every amount, note, and payment detail is encrypted with AES on-device. Nobody sees your finances but you.",
    color: "#10B981",
    tint: "rgba(16,185,129,0.12)",
  },
  {
    icon: CreditCard,
    title: "Every Account Type",
    description:
      "Track debit, credit cards with billing cycles, plus money you've borrowed or lent, all in one clean place.",
    color: "#8B5CF6",
    tint: "rgba(139,92,246,0.12)",
  },
  {
    icon: PieChart,
    title: "Visual Spending Insights",
    description:
      "Instantly see where your money goes with category breakdowns, trends, and a live spending velocity meter.",
    color: "#F59E0B",
    tint: "rgba(245,158,11,0.12)",
  },
  {
    icon: Tags,
    title: "Custom Categories & Tags",
    description:
      "Organize transactions your way with reusable tags and categories that make reporting effortless.",
    color: "#EF4444",
    tint: "rgba(239,68,68,0.12)",
  },
  {
    icon: ScanLine,
    title: "Log Expenses in Seconds",
    description:
      "Snap a receipt or type an amount. Adding a transaction takes a couple of taps, not a chore.",
    color: "#06B6D4",
    tint: "rgba(6,182,212,0.12)",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description:
      "Filter by date range, account, or tag and get cached, lightning-fast reports whenever you need them.",
    color: "#2563EB",
    tint: "rgba(37,99,235,0.12)",
  },
  {
    icon: CloudUpload,
    title: "Optional Cloud Backup",
    description:
      "Stay local-first by default, or back up securely to the cloud so you never lose a record.",
    color: "#14B8A6",
    tint: "rgba(20,184,166,0.12)",
  },
];

export interface Highlight {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}

export const HIGHLIGHTS: Highlight[] = [
  { icon: TrendingUp, label: "Real-time balance tracking", value: "Live", color: "#10B981" },
  { icon: Zap, label: "Expense logged in", value: "< 5s", color: "#F59E0B" },
  { icon: Moon, label: "Beautiful dark mode", value: "Built-in", color: "#8B5CF6" },
  { icon: Wallet, label: "Account types supported", value: "4+", color: "#3B82F6" },
];

export interface Step {
  number: string;
  title: string;
  description: string;
}

export const STEPS: Step[] = [
  {
    number: "01",
    title: "Add your accounts",
    description:
      "Set up debit, credit, borrowed, or lent accounts in seconds. No bank login required.",
  },
  {
    number: "02",
    title: "Log as you spend",
    description:
      "Capture expenses and income on the go with categories, tags, and encrypted notes.",
  },
  {
    number: "03",
    title: "See the full picture",
    description:
      "Watch your dashboard, reports, and spending insights update instantly, fully offline.",
  },
];
