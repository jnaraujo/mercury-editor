import CreateNewNoteButton from "@/components/create-new-note-button";
import EmptyNotes from "@/components/empty-notes";
import Note from "@/components/note";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotes } from "@/hooks/useNotes";
import { useNotesStore } from "@/stores/notesStore";
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
    <main className="container flex max-w-screen-md flex-col space-y-0.5 overflow-auto py-4">
      <header className="flex h-10 items-center justify-between">
        <h1 className="text-sm text-zinc-700 dark:text-zinc-400">
          Notas recentes
        </h1>

        <CreateNewNoteButton />
      </header>

      <ScrollArea className="w-full rounded-md pr-4" type="always">
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
    </main>
  );
}
