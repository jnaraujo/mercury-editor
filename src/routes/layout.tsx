import CreateNewNoteDialog from "@/components/create-new-note-dialog";
import SettingsOpen from "@/components/settings-open";
import Shortcuts from "@/components/shortcuts";
import ThemeToggle from "@/components/theme-toggle";
import { Toaster } from "@/components/ui/toaster";
import {
  onFilePathEventReceived,
  onStartupTimeEventReceived,
  sendStartupMessage,
} from "@/lib/application";
import { randomUUID } from "@/lib/crypto";
import { createNotesDirIfNotExists } from "@/lib/files";
import { addNote, findNoteByPath } from "@/lib/notes";
import { useCommandStore } from "@/stores/commandStore";
import { open as openExternalLink } from "@tauri-apps/api/shell";
import { lazy, Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const CommandWrapper = lazy(() => import("@/components/command-wrapper"));

export default function Layout() {
  const openCommand = useCommandStore((state) => state.open);
  const navigate = useNavigate();

  useEffect(() => {
    createNotesDirIfNotExists();
  }, []);

  useEffect(() => {
    async function setupStartupListeners() {
      onStartupTimeEventReceived().then(({ time }) => {
        const elapsedTime = Date.now() - time;
        console.log(`Startup time: ${elapsedTime}ms`);
      });

      onFilePathEventReceived().then(({ filename, path }) => {
        if (!filename || !path) {
          return;
        }

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
    }

    setupStartupListeners().then(() => {
      sendStartupMessage(); // should be called after setupStartupListeners
    });
  }, [navigate]);

  return (
    <>
      <div className="flex h-screen flex-col overflow-hidden bg-zinc-100 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
        <Outlet />

        <footer className="mx-auto flex w-full shrink-0 items-center justify-between px-2 py-1">
          <SettingsOpen />
          <p className="text-sm text-zinc-500 dark:text-zinc-600">
            <a
              className="cursor-pointer hover:underline"
              onClick={() => {
                openExternalLink(
                  "https://github.com/jnaraujo/mercury-editor/releases",
                );
              }}
            >
              v{__APP_VERSION__}
            </a>
          </p>
        </footer>
      </div>

      {openCommand && (
        <Suspense>
          <CommandWrapper />
        </Suspense>
      )}

      <Shortcuts />
      <ThemeToggle />
      <CreateNewNoteDialog />
      <Toaster />
    </>
  );
}
