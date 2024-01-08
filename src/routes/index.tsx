import Note from "@/components/note";
import { Button } from "@/components/ui/button";
import useNote from "@/hooks/useNote";
import { notesStore } from "@/stores/notesStore";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";

export default function Home() {
  const { createNote, deleteNote } = useNote();
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

        <Button
          variant="outline"
          className="bg-transparent hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
          onClick={() => createNote("Nova nota")}
        >
          Criar nota
        </Button>
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
