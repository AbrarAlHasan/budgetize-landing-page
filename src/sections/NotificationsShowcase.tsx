import {
  Bell,
  AlertTriangle,
  CalendarClock,
  PiggyBank,
  CloudUpload,
} from "lucide-react";
import {
  ShowcaseSection,
  type ShowcaseStep,
} from "../components/ShowcaseSection";
import { BuildableNotifications } from "../components/app-ui/BuildableNotifications";

const STEPS: ShowcaseStep[] = [
  {
    icon: Bell,
    tag: "Inbox",
    title: "Nudges, not noise",
    text: "A single inbox gathers only the alerts that matter, with an unread dot so you know at a glance when something needs you.",
    color: "#3B82F6",
  },
  {
    icon: AlertTriangle,
    tag: "Budget alerts",
    title: "Know before you overspend",
    text: "The moment a category creeps toward its limit, Budgetize pings you, so an overspend becomes a choice, not a surprise.",
    color: "#EF4444",
  },
  {
    icon: CalendarClock,
    tag: "Bill reminders",
    title: "Never miss a due date",
    text: "Upcoming bills surface a day ahead with the exact amount, giving you time to move money before it's due.",
    color: "#F59E0B",
  },
  {
    icon: PiggyBank,
    tag: "Goal milestones",
    title: "Celebrate the wins",
    text: "Hit a savings target and you'll know right away, small moments of progress that keep the habit going.",
    color: "#10B981",
  },
  {
    icon: CloudUpload,
    tag: "Backup reminders",
    title: "Stay backed up",
    text: "A gentle weekly reminder keeps your encrypted Google Drive backup fresh, toggle it to match your own rhythm.",
    color: "#1A73E8",
  },
];

export function NotificationsShowcase() {
  return (
    <ShowcaseSection
      id="notifications"
      eyebrow="Right alert, right moment"
      heading={
        <>
          Notifications that{" "}
          <span className="text-gradient">keep you ahead</span>
        </>
      }
      intro="Keep scrolling, the Notifications screen assembles itself, each card a timely nudge that helps you act before money problems happen."
      steps={STEPS}
      renderScreen={(active) => <BuildableNotifications activeStep={active} />}
    />
  );
}
