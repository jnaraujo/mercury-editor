import CreateNewNoteButton from "./create-new-note-button";

export default function EmptyNotes() {
  return (
    <div className="flex h-60 flex-col items-center justify-center gap-2">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
          Nenhuma nota encontrada
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Crie uma nota para começar
        </p>
      </div>

      <CreateNewNoteButton className="w-44" />
    </div>
  );
}
