import SettingsOpen from "@/components/settings-open";
import Shortcuts from "@/components/shortcuts";
import ThemeToggle from "@/components/theme-toggle";
import { useCommandStore } from "@/stores/commandStore";
import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

const CommandWrapper = lazy(() => import("@/components/command-wrapper"));

export default function Layout() {
  const openCommand = useCommandStore((state) => state.open);
  return (
    <>
      <div className="min-h-screen bg-zinc-100 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
        <Outlet />
      </div>

      <div className="fixed bottom-4 left-4 flex gap-4 w-fit">
        <SettingsOpen />
      </div>

      <div className="fixed top-4 right-4 flex gap-4 w-fit">
        <ThemeToggle />
      </div>

      <Suspense>{openCommand && <CommandWrapper />}</Suspense>
      <Shortcuts />
    </>
  );
}
