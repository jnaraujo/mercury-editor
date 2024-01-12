import { cn } from "@/lib/utils";
import { useTitleStore } from "@/stores/titleStore";
import { window as TauriWindow } from "@tauri-apps/api";
import { TauriEvent } from "@tauri-apps/api/event";
import { appWindow } from "@tauri-apps/api/window";
import { Minus, Square, X } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  isFullscreen: boolean;
}
export default function Titlebar({ isFullscreen }: Props) {
  const title = useTitleStore((state) => state.title);
  const { pathname } = useLocation();

  useEffect(() => {
    appWindow.setTitle(title);
  }, [title]);

  return (
    <section
      data-tauri-drag-region
      className={cn(
        "flex h-7 select-none items-center justify-between bg-zinc-900 shadow-md",
        {
          hidden: isFullscreen,
        },
      )}
    >
      <div className="px-4">
        <span className="text-xs text-zinc-300">{title}</span>
      </div>

      <div className="flex items-center">
        <button
          tabIndex={-1}
          className="flex h-7 w-12 items-center justify-center transition-colors duration-75 hover:bg-zinc-800"
          onClick={() => {
            appWindow.minimize();
          }}
        >
          <Minus className="text-zinc-50" size={16} />
        </button>
        <button
          tabIndex={-1}
          className="flex h-7 w-12 items-center justify-center transition-colors duration-75 hover:bg-zinc-800"
          onClick={() => {
            appWindow.toggleMaximize();
          }}
        >
          <Square className="text-zinc-50" size={12} />
        </button>
        <button
          tabIndex={-1}
          className="flex h-7 w-12 items-center justify-center transition-colors duration-75 hover:bg-red-700"
          onClick={() => {
            // appWindow.close() do not trigger the WINDOW_CLOSE_REQUESTED event
            // https://github.com/tauri-apps/tauri/issues/5288#issuecomment-1261501470
            // probably fixed in v2
            if (pathname === "/editor") {
              TauriWindow.getCurrent().emit(TauriEvent.WINDOW_CLOSE_REQUESTED);
            } else {
              appWindow.close();
            }
          }}
        >
          <X className=" text-zinc-50" size={16} />
        </button>
      </div>
    </section>
  );
}
