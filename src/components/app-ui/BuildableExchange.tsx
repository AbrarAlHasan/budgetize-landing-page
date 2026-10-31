import { motion } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  Check,
  HandCoins,
} from "lucide-react";
import { Piece } from "./Piece";

interface BuildableExchangeProps {
  /** Index of the highest step currently revealed (-1 = empty). */
  activeStep: number;
}

interface ExchangeEntry {
  name: string;
  /** Short note describing what the exchange was for. */
  note: string;
  amount: string;
  date: string;
  /** Avatar initials. */
  initials: string;
  /** Avatar background tint. */
  tint: string;
  /** Avatar text color. */
  color: string;
  /** Whether this person has settled up. */
  settled?: boolean;
}

/** People who owe the user money (money the user lent out). */
const LENT: ExchangeEntry[] = [
  {
    name: "Sarah Chen",
    note: "Concert tickets",
    amount: "$120",
    date: "Oct 24",
    initials: "SC",
    tint: "#D1FAE5",
    color: "#059669",
  },
  {
    name: "Mike Reyes",
    note: "Dinner split",
    amount: "$45",
    date: "Oct 20",
    initials: "MR",
    tint: "#D1FAE5",
    color: "#059669",
  },
];

/** People the user owes money to (money the user borrowed). */
const BORROWED: ExchangeEntry[] = [
  {
    name: "Alex Kim",
    note: "Apartment deposit",
    amount: "$300",
    date: "Oct 18",
    initials: "AK",
    tint: "#FEE2E2",
    color: "#DC2626",
  },
  {
    name: "Priya Nair",
    note: "Groceries",
    amount: "$28",
    date: "Oct 15",
    initials: "PN",
    tint: "#FEE2E2",
    color: "#DC2626",
    settled: true,
  },
];

/**
 * The Exchange screen, assembled piece by piece. Tracks money lent and
 * borrowed, with a net summary at the top and settle-up status per person.
 * Reuses the shared <Piece> reveal mechanic so it animates just like the
 * other buildable screens.
 */
export function BuildableExchange({
  activeStep,
}: Readonly<BuildableExchangeProps>) {
  return (
    <div className="min-h-full bg-gray-50 px-5 pb-10 pt-5">
      {/* 0 — header + net summary */}
      <Piece index={0} activeStep={activeStep}>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold leading-tight text-gray-900">
              Exchange
            </h1>
            <p className="text-[13px] text-gray-500">Lent &amp; borrowed</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
            <HandCoins size={18} className="text-brand-500" />
          </div>
        </div>

        <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 p-4 shadow-sm">
          <p className="text-[11px] font-medium text-white/70">Net balance</p>
          <p className="mt-0.5 text-2xl font-bold text-white">+$137</p>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <div className="rounded-xl bg-white/15 px-3 py-2">
              <div className="flex items-center gap-1 text-[10px] font-medium text-white/80">
                <ArrowDownLeft size={12} />
                You are owed
              </div>
              <p className="mt-0.5 text-[15px] font-bold text-white">$165</p>
            </div>
            <div className="rounded-xl bg-white/15 px-3 py-2">
              <div className="flex items-center gap-1 text-[10px] font-medium text-white/80">
                <ArrowUpRight size={12} />
                You owe
              </div>
              <p className="mt-0.5 text-[15px] font-bold text-white">$28</p>
            </div>
          </div>
        </div>
      </Piece>

      {/* 1 — Lent (people who owe you) */}
      <Piece index={1} activeStep={activeStep}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">You lent</h2>
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
            {LENT.length} people
          </span>
        </div>
        <div className="mb-6 space-y-2.5">
          {LENT.map((entry) => (
            <ExchangeRow key={entry.name} entry={entry} direction="lent" />
          ))}
        </div>
      </Piece>

      {/* 2 — Borrowed (people you owe) */}
      <Piece index={2} activeStep={activeStep}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">You borrowed</h2>
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700">
            {BORROWED.length} people
          </span>
        </div>
        <div className="mb-6 space-y-2.5">
          {BORROWED.map((entry) => (
            <ExchangeRow key={entry.name} entry={entry} direction="borrowed" />
          ))}
        </div>
      </Piece>

      {/* 3 — settle up action */}
      <Piece index={3} activeStep={activeStep}>
        <motion.button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 py-3.5 text-[14px] font-semibold text-white shadow-sm"
          initial={{ scale: 0.98 }}
          animate={{ scale: activeStep >= 3 ? 1 : 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Check size={17} />
          Settle up &amp; log repayment
        </motion.button>
      </Piece>
    </div>
  );
}

function ExchangeRow({
  entry,
  direction,
}: Readonly<{ entry: ExchangeEntry; direction: "lent" | "borrowed" }>) {
  const isLent = direction === "lent";
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold"
        style={{ backgroundColor: entry.tint, color: entry.color }}
      >
        {entry.initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-gray-900">{entry.name}</p>
        <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-gray-500">
          <span className="truncate">{entry.note}</span>
          <span className="text-gray-300">·</span>
          <span className="shrink-0">{entry.date}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span
          className="text-[14px] font-bold"
          style={{ color: isLent ? "#059669" : "#DC2626" }}
        >
          {isLent ? "+" : "-"}
          {entry.amount}
        </span>
        {entry.settled ? (
          <span className="flex items-center gap-1 rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] font-semibold text-gray-500">
            <Check size={9} />
            Settled
          </span>
        ) : (
          <span className="flex items-center gap-1 rounded-full bg-amber-50 px-1.5 py-0.5 text-[9px] font-semibold text-amber-600">
            <Clock size={9} />
            Pending
          </span>
        )}
      </div>
    </div>
  );
}
