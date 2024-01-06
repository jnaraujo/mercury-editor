import CommandWrapper from "@/components/command-wrapper";
import SettingsOpen from "@/components/settings-open";
import Shortcuts from "@/components/shortcuts";
import ThemeToggle from "@/components/theme-toggle";
import { Outlet, RootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

function RootComponent() {
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

      <CommandWrapper />
      <Shortcuts />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}

export const Route = new RootRoute({
  component: RootComponent,
});
