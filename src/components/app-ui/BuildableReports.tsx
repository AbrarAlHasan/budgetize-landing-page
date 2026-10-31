import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Piece } from "./Piece";

interface BuildableReportsProps {
  /** Index of the highest step currently revealed (-1 = empty). */
  activeStep: number;
}

const CATEGORIES = [
  { name: "Food & Dining", pct: 32, amount: "$1,030", color: "#3B82F6" },
  { name: "Shopping", pct: 24, amount: "$772", color: "#8B5CF6" },
  { name: "Transport", pct: 18, amount: "$579", color: "#10B981" },
  { name: "Bills", pct: 14, amount: "$450", color: "#F59E0B" },
  { name: "Entertainment", pct: 12, amount: "$387", color: "#EF4444" },
];

const TREND = [48, 62, 55, 71, 66, 82];

/**
 * The Reports screen, assembled piece by piece. Reuses the same <Piece>
 * reveal mechanic as the dashboard so the animation feels identical.
 */
export function BuildableReports({ activeStep }: Readonly<BuildableReportsProps>) {
  let acc = 0;
  const stops = CATEGORIES.map((c) => {
    const start = acc;
    acc += c.pct;
    return `${c.color} ${start}% ${acc}%`;
  }).join(", ");

  return (
    <div className="min-h-full bg-gray-50 px-5 pb-10 pt-5">
      {/* 0 — header */}
      <Piece index={0} activeStep={activeStep}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold leading-tight text-gray-900">
            Reports
          </h1>
          <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-1">
            <Calendar size={13} className="text-gray-500" />
            <span className="text-[11px] font-medium text-gray-600">
              Oct 1 – Oct 31, 2026
            </span>
          </div>
        </div>
      </Piece>

      {/* 1 — donut */}
      <Piece index={1} activeStep={activeStep}>
        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-5">
            <div
              className="relative h-28 w-28 shrink-0 rounded-full"
              style={{ background: `conic-gradient(${stops})` }}
            >
              <div className="absolute inset-[20%] flex flex-col items-center justify-center rounded-full bg-white">
                <span className="text-[10px] text-gray-500">Spent</span>
                <span className="text-sm font-bold text-gray-900">$3,218</span>
              </div>
            </div>
            <div className="flex-1 space-y-2.5">
              {CATEGORIES.slice(0, 3).map((c) => (
                <div key={c.name} className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="flex-1 text-[11px] text-gray-600">
                    {c.name}
                  </span>
                  <span className="text-[11px] font-semibold text-gray-900">
                    {c.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Piece>

      {/* 2 — monthly trend */}
      <Piece index={2} activeStep={activeStep}>
        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[13px] font-semibold text-gray-900">
              6-Month Trend
            </span>
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-600">
              +8% vs avg
            </span>
          </div>
          <div className="flex h-20 items-end gap-2">
            {TREND.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-brand-500 to-brand-300"
                initial={{ height: 0 }}
                animate={{ height: activeStep >= 2 ? `${h}%` : 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
              />
            ))}
          </div>
        </div>
      </Piece>

      {/* 3 — breakdown */}
      <Piece index={3} activeStep={activeStep}>
        <h2 className="mb-3 text-base font-bold text-gray-900">
          Category Breakdown
        </h2>
        <div className="space-y-2.5">
          {CATEGORIES.map((c) => (
            <div
              key={c.name}
              className="rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[13px] font-medium text-gray-800">
                  {c.name}
                </span>
                <span className="text-[13px] font-bold text-gray-900">
                  {c.amount}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: c.color }}
                  initial={{ width: 0 }}
                  animate={{ width: activeStep >= 3 ? `${c.pct * 3}%` : 0 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>
      </Piece>
    </div>
  );
}
