import CreateNewNoteDialog from "@/components/create-new-note-dialog";
import SettingsOpen from "@/components/settings-open";
import Shortcuts from "@/components/shortcuts";
import ThemeToggle from "@/components/theme-toggle";
import { onStartupWithFilePath, setupAppWindow } from "@/lib/application";
import { randomUUID } from "@/lib/crypto";
import {
  addNotesFromDirIfNotExists,
  createNotesDirIfNotExists,
} from "@/lib/files";
import { useCommandStore } from "@/stores/commandStore";
import { useNotesStore } from "@/stores/notesStore";
import { lazy, Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const CommandWrapper = lazy(() => import("@/components/command-wrapper"));

export default function Layout() {
  const openCommand = useCommandStore((state) => state.open);
  const navigate = useNavigate();
  const addNote = useNotesStore((state) => state.addNote);
  const findNoteByPath = useNotesStore((state) => state.findNoteByPath);

  useEffect(() => {
    createNotesDirIfNotExists();
    addNotesFromDirIfNotExists();
  }, []);

  useEffect(() => {
    setupAppWindow().then(() => console.log("App window is ready"));

    onStartupWithFilePath().then(({ filename, path }) => {
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
  }, [addNote, findNoteByPath, navigate]);

  return (
    <>
      <div className="min-h-screen bg-zinc-100 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
        <Outlet />
      </div>

      <div className="fixed bottom-4 left-4 flex w-fit gap-4">
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
