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
    <div className="container max-w-screen-md py-6 space-y-4 h-screen flex flex-col">
      <header className="flex justify-between items-center h-10">
        <h1 className="text-zinc-700 text-sm dark:text-zinc-400">
          Notas recentes
        </h1>

        <CreateNewNoteButton />
      </header>

      <main className="flex-1">
        <section className="space-y-0.5 h-full">
          <ScrollArea className="h-[80vh] w-full rounded-md pr-4" type="always">
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
    </div>
  );
}
