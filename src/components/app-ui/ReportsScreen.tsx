import { Calendar } from "lucide-react";

const CATEGORIES = [
  { name: "Food & Dining", pct: 32, amount: "$1,030", color: "#3B82F6" },
  { name: "Shopping", pct: 24, amount: "$772", color: "#8B5CF6" },
  { name: "Transport", pct: 18, amount: "$579", color: "#10B981" },
  { name: "Bills", pct: 14, amount: "$450", color: "#F59E0B" },
  { name: "Entertainment", pct: 12, amount: "$387", color: "#EF4444" },
];

/** In-browser recreation of the Reports screen with a donut + breakdown. */
export function ReportsScreen() {
  // Build conic-gradient stops for the donut
  let acc = 0;
  const stops = CATEGORIES.map((c) => {
    const start = acc;
    acc += c.pct;
    return `${c.color} ${start}% ${acc}%`;
  }).join(", ");

  return (
    <div className="min-h-full bg-gray-50 px-5 pb-10 pt-5">
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

      {/* Donut */}
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

      {/* Breakdown list */}
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
              <div
                className="h-full rounded-full"
                style={{ width: `${c.pct * 3}%`, backgroundColor: c.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
