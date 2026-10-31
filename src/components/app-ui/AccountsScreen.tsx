import { Plus } from "lucide-react";

type AccountType = "debit" | "credit" | "borrowed" | "lent";

const typeStyles: Record<AccountType, { chip: string; text: string }> = {
  debit: { chip: "bg-blue-100", text: "text-blue-800" },
  credit: { chip: "bg-purple-100", text: "text-purple-800" },
  borrowed: { chip: "bg-orange-100", text: "text-orange-800" },
  lent: { chip: "bg-green-100", text: "text-green-800" },
};

interface Acc {
  name: string;
  bank: string;
  type: AccountType;
  meta?: string;
  balance: string;
}

const ACCOUNTS: Acc[] = [
  { name: "Everyday Spending", bank: "HDFC Bank", type: "debit", balance: "$2,480.10" },
  {
    name: "Travel Card",
    bank: "ICICI Bank",
    type: "credit",
    meta: "Limit: $5,000",
    balance: "-$812.40",
  },
  { name: "Loan to Alex", bank: "Personal", type: "lent", balance: "$500.00" },
  {
    name: "From Priya",
    bank: "Personal",
    type: "borrowed",
    balance: "-$150.00",
  },
];

/** In-browser recreation of the Accounts screen. */
export function AccountsScreen() {
  return (
    <div className="min-h-full bg-gray-50 px-5 pb-10 pt-5">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold leading-tight text-gray-900">
            Accounts
          </h1>
          <p className="text-[13px] text-gray-500">4 accounts</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600">
          <Plus size={20} className="text-white" />
        </div>
      </div>

      {/* Total balance band */}
      <div className="mb-6 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white shadow-lg">
        <p className="text-xs font-medium text-brand-100">Total Balance</p>
        <p className="mt-1 text-2xl font-bold">$2,017.70</p>
        <div className="mt-4 flex gap-8 text-xs">
          <div>
            <p className="text-brand-100">Assets</p>
            <p className="font-semibold">$2,980.10</p>
          </div>
          <div>
            <p className="text-brand-100">Liabilities</p>
            <p className="font-semibold">$962.40</p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {ACCOUNTS.map((a) => {
          const s = typeStyles[a.type];
          return (
            <div
              key={a.name}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-gray-900">
                    {a.name}
                  </p>
                  <p className="mb-2 text-xs text-gray-500">{a.bank}</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-medium capitalize ${s.chip} ${s.text}`}
                    >
                      {a.type}
                    </span>
                    {a.meta && (
                      <span className="text-[11px] text-gray-500">
                        {a.meta}
                      </span>
                    )}
                  </div>
                </div>
                <p
                  className={`shrink-0 text-base font-bold ${
                    a.balance.startsWith("-")
                      ? "text-red-500"
                      : "text-gray-900"
                  }`}
                >
                  {a.balance}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
