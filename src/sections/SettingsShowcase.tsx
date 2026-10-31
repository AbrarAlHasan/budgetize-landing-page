import { SlidersHorizontal, CloudUpload, Palette, Lock } from "lucide-react";
import {
  ShowcaseSection,
  type ShowcaseStep,
} from "../components/ShowcaseSection";
import { BuildableSettings } from "../components/app-ui/BuildableSettings";

const STEPS: ShowcaseStep[] = [
  {
    icon: SlidersHorizontal,
    tag: "Settings",
    title: "One place to tune it all",
    text: "Everything that shapes your experience lives here, backup, preferences and security, laid out so nothing is buried.",
    color: "#3B82F6",
  },
  {
    icon: CloudUpload,
    tag: "Google Drive backup",
    title: "Your data, backed up to your Drive",
    text: "Flip one toggle and Budgetize keeps an encrypted backup in your own Google Drive, synced automatically with a timestamp of the last run.",
    color: "#1A73E8",
  },
  {
    icon: Palette,
    tag: "Preferences",
    title: "Make it yours",
    text: "Set your appearance, currency and categories in a tidy grouped list, each one a tap away from changing.",
    color: "#F59E0B",
  },
  {
    icon: Lock,
    tag: "Security",
    title: "Locked down by default",
    text: "Face ID app lock and on-device encrypted notes stay on, so your money data never leaves your control.",
    color: "#7C3AED",
  },
];

export function SettingsShowcase() {
  return (
    <ShowcaseSection
      id="settings"
      eyebrow="Yours, and only yours"
      heading={
        <>
          Settings built around{" "}
          <span className="text-gradient">privacy and control</span>
        </>
      }
      intro="Keep scrolling, the Settings screen assembles itself, starting with the encrypted Google Drive backup that keeps your data safe and portable."
      steps={STEPS}
      renderScreen={(active) => <BuildableSettings activeStep={active} />}
    />
  );
}
