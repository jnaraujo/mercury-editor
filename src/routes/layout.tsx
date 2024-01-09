import CreateNewNoteDialog from "@/components/create-new-note-dialog";
import SettingsOpen from "@/components/settings-open";
import Shortcuts from "@/components/shortcuts";
import ThemeToggle from "@/components/theme-toggle";
import { randomUUID } from "@/lib/crypto";
import { useCommandStore } from "@/stores/commandStore";
import { useNotesStore } from "@/stores/notesStore";
import { WebviewWindow } from "@tauri-apps/api/window";
import { lazy, Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const CommandWrapper = lazy(() => import("@/components/command-wrapper"));

async function setupAppWindow() {
  const appWindow = (await import("@tauri-apps/api/window")).appWindow;
  appWindow.show();
}

export default function Layout() {
  const openCommand = useCommandStore((state) => state.open);
  const navigate = useNavigate();
  const addNote = useNotesStore((state) => state.addNote);
  const findNoteByPath = useNotesStore((state) => state.findNoteByPath);

  useEffect(() => {
    setupAppWindow().then(() => console.log("App window is ready"));

    const webview = new WebviewWindow("main");

    webview.emit("startup", "");

    const unlisten = webview.listen("file_path", async (event) => {
      const path = (event.payload as any).message as string;
      if (!path) return;

      const filename = path.replace(/^.*[\\/]/, "");

      if (!findNoteByPath(path)) {
        addNote({
          id: randomUUID(),
          title: filename,
          path,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          description: "",
        });
      }

      navigate("/editor", {
        state: { path },
      });
    });

    return () => {
      unlisten.then((unlisten) => unlisten());
    };
  }, [addNote, findNoteByPath, navigate]);

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
      <CreateNewNoteDialog />
    </>
  );
}
