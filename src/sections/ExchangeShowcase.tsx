import { HandCoins, ArrowDownLeft, ArrowUpRight, Check } from "lucide-react";
import {
  ShowcaseSection,
  type ShowcaseStep,
} from "../components/ShowcaseSection";
import { BuildableExchange } from "../components/app-ui/BuildableExchange";

const STEPS: ShowcaseStep[] = [
  {
    icon: HandCoins,
    tag: "Exchange",
    title: "Lending and borrowing, tracked",
    text: "One net figure tells you where you stand, how much you're owed against how much you owe, so informal money between friends never slips through the cracks.",
    color: "#3B82F6",
  },
  {
    icon: ArrowDownLeft,
    tag: "You lent",
    title: "Know who owes you",
    text: "Every amount you lend is logged against a person with a note and date, so you always remember the concert tickets and the dinner split.",
    color: "#10B981",
  },
  {
    icon: ArrowUpRight,
    tag: "You borrowed",
    title: "Keep your own tabs honest",
    text: "The money you borrow sits right beside what you're owed, with a clear pending or settled badge so nothing is forgotten on either side.",
    color: "#EF4444",
  },
  {
    icon: Check,
    tag: "Settle up",
    title: "Close the loop in a tap",
    text: "When someone pays you back, settle up and Budgetize logs the repayment as a real transaction, keeping your balances and reports accurate.",
    color: "#7C3AED",
  },
];

export function ExchangeShowcase() {
  return (
    <ShowcaseSection
      id="exchange"
      eyebrow="Money between people"
      heading={
        <>
          Track what you <span className="text-gradient">lend and borrow</span>
        </>
      }
      intro="Keep scrolling, the Exchange screen assembles itself, starting with a net balance that shows exactly where you stand with everyone."
      steps={STEPS}
      renderScreen={(active) => <BuildableExchange activeStep={active} />}
    />
  );
}
