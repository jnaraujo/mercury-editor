import CreateNewNoteButton from "@/components/create-new-note-button";
import EmptyNotes from "@/components/empty-notes";
import ImportFromDiskButton from "@/components/import-from-disk-button";
import Note from "@/components/note";
import { ScrollArea } from "@/components/ui/scroll-area";
import { deleteFileAndNote, getNotes } from "@/lib/notes";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";

export default function Home() {
  const notes = getNotes();

  const sortedNotes = notes.sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  useEffect(() => {
    appWindow.setTitle(`Mercury`);
  }, []);

  return (
    <main className="container flex h-full max-w-screen-md flex-col space-y-4 overflow-auto pt-4">
      <header className="flex h-10 items-center justify-between">
        <h1 className="text-sm text-zinc-700 dark:text-zinc-400">
          Notas recentes
        </h1>

        <div className="space-x-1">
          <ImportFromDiskButton />
          <CreateNewNoteButton />
        </div>
      </header>

      <ScrollArea className="w-full rounded-md px-3" type="always">
        {sortedNotes.map((note) => (
          <Note
            key={note.path}
            title={note.title}
            description={note.description}
            createdAt={note.createdAt}
            updatedAt={note.updatedAt}
            path={note.path}
            onDelete={() => deleteFileAndNote(note.path)}
          />
        ))}

        {sortedNotes.length === 0 && <EmptyNotes />}
      </ScrollArea>
    </main>
  );
}
