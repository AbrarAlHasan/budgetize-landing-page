import { Calendar, PieChart, LineChart, ListTree } from "lucide-react";
import {
  ShowcaseSection,
  type ShowcaseStep,
} from "../components/ShowcaseSection";
import { BuildableReports } from "../components/app-ui/BuildableReports";

const STEPS: ShowcaseStep[] = [
  {
    icon: Calendar,
    tag: "Date range",
    title: "Pick any window",
    text: "Reports open on the current month, but one tap lets you slice any range, a week, a quarter, or a custom span.",
    color: "#3B82F6",
  },
  {
    icon: PieChart,
    tag: "Spending donut",
    title: "See where it all went",
    text: "A single donut splits your spend across categories, with the biggest three called out so the story is obvious at a glance.",
    color: "#8B5CF6",
  },
  {
    icon: LineChart,
    tag: "6-month trend",
    title: "Watch the direction",
    text: "A rolling trend shows whether you're drifting up or reining it in, compared against your own running average.",
    color: "#F59E0B",
  },
  {
    icon: ListTree,
    tag: "Category breakdown",
    title: "Every category, ranked",
    text: "A clean breakdown lists each category with its share and amount, animated bars make the proportions impossible to miss.",
    color: "#10B981",
  },
];

export function ReportsShowcase() {
  return (
    <ShowcaseSection
      id="reports"
      eyebrow="Make sense of your money"
      heading={
        <>
          Reports that{" "}
          <span className="text-gradient">answer the hard question</span>
        </>
      }
      intro="Keep scrolling, your Reports screen assembles itself, turning raw transactions into a story you can read in seconds."
      steps={STEPS}
      renderScreen={(active) => <BuildableReports activeStep={active} />}
    />
  );
}
