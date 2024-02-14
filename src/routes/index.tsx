import CreateNewNoteButton from "@/components/create-new-note-button";
import EmptyNotes from "@/components/empty-notes";
import ImportFromDiskButton from "@/components/import-from-disk-button";
import Note from "@/components/note";
import { ScrollArea } from "@/components/ui/scroll-area";
import { deleteFileAndNote, useNotes } from "@/lib/notes";
import { cn } from "@/lib/utils";
import { useTitleStore } from "@/stores/titleStore";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const setTitle = useTitleStore((state) => state.setTitle);
  const notes = useNotes();

  const filter =
    (searchParams.get("filter") as "lastest" | "archive") ?? "lastest";

  useEffect(() => {
    setTitle(`Mercury`);
  }, [setTitle]);

  const sortedNotes = notes.sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const filteredNotes = sortedNotes.filter((note) => {
    if (filter === "archive") {
      return note.isArchived;
    }

    return !note.isArchived;
  });

  console.log(filter);

  const hasNoArchivedNotes = filter === "archive" && filteredNotes.length === 0;
  const hasNoLastestNotes = filter === "lastest" && filteredNotes.length === 0;

  return (
    <main className="container flex h-full max-w-screen-md flex-col space-y-4 overflow-auto pt-4">
      <header className="flex h-10 shrink-0 items-center justify-between">
        <h1 className="text-sm text-zinc-700 dark:text-zinc-400">Suas notas</h1>

        <div className="space-x-2">
          <ImportFromDiskButton className="h-9" />
          <CreateNewNoteButton />
        </div>
      </header>

      <div className="flex gap-4 border-b pb-1 dark:border-zinc-800">
        <button
          onClick={() => setSearchParams({ filter: "lastest" })}
          className={cn(
            "rounded-md px-1.5 py-[1px] text-sm text-zinc-700 dark:text-zinc-400",
            {
              "bg-zinc-200/80 dark:bg-zinc-800/60": filter === "lastest",
            },
          )}
        >
          Recentes
        </button>
        <button
          onClick={() => setSearchParams({ filter: "archive" })}
          className={cn(
            "rounded-md px-1.5 py-[1px] text-sm text-zinc-700 dark:text-zinc-400",
            {
              "bg-zinc-200/80 dark:bg-zinc-800/60": filter === "archive",
            },
          )}
        >
          Arquivadas
        </button>
      </div>
      <ScrollArea className="w-full rounded-md px-3" type="always">
        {filteredNotes.map((note) => (
          <Note
            key={note.path}
            title={note.title}
            description={note.description}
            createdAt={note.createdAt}
            updatedAt={note.updatedAt}
            path={note.path}
            onDelete={() => deleteFileAndNote(note.path)}
            isArchived={note.isArchived}
          />
        ))}

        {hasNoArchivedNotes && (
          <div className="flex h-60 flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
                Nenhuma nota arquivada
              </h2>
              <p className="w-72 text-center text-sm text-zinc-600 dark:text-zinc-400">
                Você pode arquivar uma nota clicando no ícone de três pontos no
                canto direito da nota.
              </p>
            </div>
          </div>
        )}

        {hasNoLastestNotes && <EmptyNotes />}
      </ScrollArea>
    </main>
  );
}
