import {
  LayoutDashboard,
  Scale,
  TrendingUp,
  BarChart3,
  Zap,
  ListChecks,
} from "lucide-react";
import {
  ShowcaseSection,
  type ShowcaseStep,
} from "../components/ShowcaseSection";
import { BuildableDashboard } from "../components/app-ui/BuildableDashboard";

const STEPS: ShowcaseStep[] = [
  {
    icon: LayoutDashboard,
    tag: "Header",
    title: "Your month, at the top",
    text: "Open the app and you're instantly oriented, the current month and a one-tap filter to slice your data any way you like.",
    color: "#3B82F6",
  },
  {
    icon: Scale,
    tag: "Summary cards",
    title: "Income vs. expense, instantly",
    text: "Two glanceable cards show exactly what came in and what went out this month, colour-coded so you read it in a second.",
    color: "#10B981",
  },
  {
    icon: TrendingUp,
    tag: "Net amount",
    title: "Are you actually ahead?",
    text: "The net card does the math for you, how much you kept this month, with your transaction count right beneath it.",
    color: "#22C55E",
  },
  {
    icon: BarChart3,
    tag: "Spending velocity",
    title: "Spot trends before they bite",
    text: "A live velocity chart shows how fast you're spending across the month, with an 'on track' signal so nothing surprises you.",
    color: "#F59E0B",
  },
  {
    icon: Zap,
    tag: "Quick actions",
    title: "Log it in two taps",
    text: "Add an expense or a new account right from the home screen. No digging through menus, capture it before you forget.",
    color: "#8B5CF6",
  },
  {
    icon: ListChecks,
    tag: "Recent activity",
    title: "Every transaction, organised",
    text: "Your latest activity with categories, tags, accounts and encrypted notes, each one tappable to edit or duplicate.",
    color: "#EF4444",
  },
];

export function AppShowcase() {
  return (
    <ShowcaseSection
      id="preview"
      eyebrow="Watch it come together"
      heading={
        <>
          The dashboard,{" "}
          <span className="text-gradient">built piece by piece</span>
        </>
      }
      intro="Keep scrolling, the phone powers on and the real Budgetize home screen assembles itself, one component at a time."
      steps={STEPS}
      renderScreen={(active) => <BuildableDashboard activeStep={active} />}
    />
  );
}
