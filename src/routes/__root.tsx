import { Outlet, RootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

function RootComponent() {
  return (
    <>
      <div className="min-h-screen bg-zinc-200 font-sans text-zinc-900 antialiased">
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}

export const Route = new RootRoute({
  component: RootComponent,
})
