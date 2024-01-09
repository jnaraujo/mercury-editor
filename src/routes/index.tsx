import CreateNewNoteButton from "@/components/create-new-note-button";
import EmptyNotes from "@/components/empty-notes";
import Note from "@/components/note";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotes } from "@/hooks/useNotes";
import { useNotesStore } from "@/stores/notesStore";
import { open as openExternalLink } from "@tauri-apps/api/shell";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";

export default function Home() {
  const { deleteNote } = useNotes();
  const notes = useNotesStore((state) => state.notes);

  const sortedNotes = notes.sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  useEffect(() => {
    appWindow.setTitle(`Mercury`);
  }, []);

  return (
    <div className="container flex h-screen max-w-screen-md flex-col space-y-4 py-4">
      <header className="flex h-10 items-center justify-between">
        <h1 className="text-sm text-zinc-700 dark:text-zinc-400">
          Notas recentes
        </h1>

        <CreateNewNoteButton />
      </header>

      <main className="overflow-hidden">
        <section className="h-full space-y-0.5">
          <ScrollArea className="h-full w-full rounded-md pr-4" type="always">
            {sortedNotes.map((note) => (
              <Note
                key={note.path}
                title={note.title}
                description={note.description}
                createdAt={note.createdAt}
                path={note.path}
                onDelete={() => deleteNote(note.path)}
              />
            ))}

            {sortedNotes.length === 0 && <EmptyNotes />}
          </ScrollArea>
        </section>
      </main>
      <footer className="flex h-3 shrink-0 items-center justify-end">
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
  );
}
