import { motion } from "framer-motion";
import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Filter,
  PlusCircle,
  Wallet,
  UtensilsCrossed,
  Car,
} from "lucide-react";
import { Piece } from "./Piece";

interface BuildableDashboardProps {
  /** Index of the highest step currently revealed (-1 = empty). */
  activeStep: number;
}

/**
 * The dashboard, assembled piece by piece. Each `activeStep` increment
 * reveals the next UI block with a spring-in animation.
 */
export function BuildableDashboard({ activeStep }: BuildableDashboardProps) {
  return (
    <div className="min-h-full bg-gray-50 px-5 pb-10 pt-5">
      {/* 0 — header */}
      <Piece index={0} activeStep={activeStep}>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold leading-tight text-gray-900">
              Dashboard
            </h1>
            <p className="text-[13px] text-gray-500">October 2026</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-xl bg-brand-50 px-3 py-2">
            <Filter size={18} className="text-brand-500" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
          </div>
        </div>
      </Piece>

      {/* 1 — summary cards */}
      <Piece index={1} activeStep={activeStep}>
        <div className="mb-3 flex gap-3">
          <div className="flex-1 rounded-2xl bg-[#D1FAE5] p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-600">Income</span>
              <ArrowUp size={14} className="text-accent-green" />
            </div>
            <p className="text-lg font-bold text-gray-900">$8,450</p>
            <p className="mt-0.5 text-[11px] text-gray-500">This month</p>
          </div>
          <div className="flex-1 rounded-2xl bg-[#FEE2E2] p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-600">Expense</span>
              <ArrowDown size={14} className="text-accent-red" />
            </div>
            <p className="text-lg font-bold text-gray-900">$3,218</p>
            <p className="mt-0.5 text-[11px] text-gray-500">This month</p>
          </div>
        </div>
      </Piece>

      {/* 2 — net amount */}
      <Piece index={2} activeStep={activeStep}>
        <div className="mb-6 rounded-2xl bg-[#F0FDF4] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-[13px] text-gray-600">Net Amount</p>
              <p className="text-xl font-bold text-green-600">$5,231.24</p>
            </div>
            <TrendingUp size={28} className="text-accent-green" />
          </div>
          <p className="mt-2 text-[11px] text-gray-500">128 transactions</p>
        </div>
      </Piece>

      {/* 3 — spending velocity */}
      <Piece index={3} activeStep={activeStep}>
        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[13px] font-semibold text-gray-900">
              Spending Velocity
            </span>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600">
              On track
            </span>
          </div>
          <div className="flex h-20 items-end gap-1.5">
            {[40, 55, 35, 70, 50, 85, 62, 48, 90, 60, 75, 45].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-brand-500 to-brand-300"
                initial={{ height: 0 }}
                animate={{ height: activeStep >= 3 ? `${h}%` : 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.03 }}
              />
            ))}
          </div>
        </div>
      </Piece>

      {/* 4 — quick actions */}
      <Piece index={4} activeStep={activeStep}>
        <div className="mb-6 flex gap-3">
          <div className="flex flex-1 flex-col items-center rounded-2xl bg-brand-600 py-4">
            <PlusCircle size={22} className="text-white" />
            <span className="mt-1.5 text-[13px] font-semibold text-white">
              Add Expense
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center rounded-2xl bg-gray-100 py-4">
            <Wallet size={22} className="text-gray-700" />
            <span className="mt-1.5 text-[13px] font-semibold text-gray-700">
              Add Account
            </span>
          </div>
        </div>
      </Piece>

      {/* 5 — recent activity */}
      <Piece index={5} activeStep={activeStep}>
        <h2 className="mb-3 text-base font-bold text-gray-900">
          Recent Activity
        </h2>
        <div className="space-y-2.5">
          <TxnRow
            icon={<UtensilsCrossed size={18} className="text-accent-red" />}
            title="Dinner at Olive & Co"
            date="Fri, 31 Oct 2026"
            amount="-$42.50"
            account="HDFC Debit"
            expense
            category="Food"
          />
          <TxnRow
            icon={<ArrowUp size={18} className="text-accent-green" />}
            title="Salary"
            date="Thu, 30 Oct 2026"
            amount="+$8,450.00"
            account="Main Account"
            category="Income"
          />
          <TxnRow
            icon={<Car size={18} className="text-accent-red" />}
            title="Fuel"
            date="Wed, 29 Oct 2026"
            amount="-$60.00"
            account="ICICI Credit"
            expense
            category="Transport"
          />
        </div>
      </Piece>
    </div>
  );
}

interface TxnRowProps {
  icon: React.ReactNode;
  title: string;
  date: string;
  amount: string;
  account: string;
  expense?: boolean;
  category: string;
}

function TxnRow({
  icon,
  title,
  date,
  amount,
  account,
  expense,
  category,
}: Readonly<TxnRowProps>) {
  return (
    <div className="flex items-center rounded-2xl bg-white p-3 shadow-sm">
      <div
        className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: expense ? "#FEE2E2" : "#D1FAE5" }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-gray-900">
              {title}
            </p>
            <p className="text-[11px] text-gray-500">{date}</p>
          </div>
          <div className="shrink-0 text-right">
            <p
              className={`text-[13px] font-bold ${
                expense ? "text-red-500" : "text-green-500"
              }`}
            >
              {amount}
            </p>
            <p className="text-[10px] text-gray-400">{account}</p>
          </div>
        </div>
        <div className="mt-1.5">
          <span className="rounded-md bg-brand-100 px-1.5 py-0.5 text-[10px] font-medium text-brand-700">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
}
