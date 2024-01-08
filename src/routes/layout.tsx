import SettingsOpen from "@/components/settings-open";
import Shortcuts from "@/components/shortcuts";
import ThemeToggle from "@/components/theme-toggle";
import { useCommandStore } from "@/stores/commandStore";
import { lazy, Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";

const CommandWrapper = lazy(() => import("@/components/command-wrapper"));

async function setupAppWindow() {
  const appWindow = (await import("@tauri-apps/api/window")).appWindow;
  appWindow.show();
}

export default function Layout() {
  const openCommand = useCommandStore((state) => state.open);

  useEffect(() => {
    setupAppWindow().then(() => console.log("App window is ready"));
  }, []);

  return (
    <>
      <div className="min-h-screen bg-zinc-100 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
        <Outlet />
      </div>

      <div className="fixed bottom-4 left-4 flex gap-4 w-fit">
        <SettingsOpen />
      </div>

      {openCommand && (
        <Suspense>
          <CommandWrapper />
        </Suspense>
      )}

      <Shortcuts />
      <ThemeToggle />
    </>
  );
}
