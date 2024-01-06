import CommandWrapper from "@/components/CommandWrapper";
import ThemeToggle from "@/components/theme-toggle";
import { Outlet, RootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

function RootComponent() {
  return (
    <>
      <div className="min-h-screen bg-zinc-100 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
        <Outlet />
      </div>
      <ThemeToggle />
      <CommandWrapper />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}

export const Route = new RootRoute({
  component: RootComponent,
});
