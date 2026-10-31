import { APP } from "../data/content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 md:flex-row">
        <div className="flex items-center gap-2.5">
          <img src="/app-icon.png" alt="Budgetize" className="h-8 w-8 rounded-lg" />
          <div>
            <p className="font-bold text-white">{APP.name}</p>
            <p className="text-xs text-slate-500">
              Private, offline-first money tracking.
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#preview" className="hover:text-white">Preview</a>
          <a href="#security" className="hover:text-white">Security</a>
          <a
            href={APP.playStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            Google Play
          </a>
        </nav>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} {APP.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
