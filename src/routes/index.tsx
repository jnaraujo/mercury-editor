import CreateNewNoteButton from "@/components/create-new-note-button";
import Note from "@/components/note";
import { useNotes } from "@/hooks/useNotes";
import { notesStore } from "@/stores/notesStore";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";

export default function Home() {
  const { deleteNote } = useNotes();
  const notes = notesStore((state) => state.notes);

  useEffect(() => {
    appWindow.setTitle(`Mercury`);
  }, []);

  return (
    <div className="container max-w-screen-md py-6 space-y-4">
      <header className="flex justify-between items-center h-10">
        <h1 className="text-zinc-700 text-sm dark:text-zinc-400">
          {">"} Notas recentes
        </h1>

        <CreateNewNoteButton />
      </header>

      <main>
        <section className="space-y-4">
          {notes.map((note) => (
            <Note
              key={note.slug}
              title={note.title}
              description={note.description}
              createdAt={note.createdAt}
              slug={note.slug}
              onDelete={() => deleteNote(note.path)}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
