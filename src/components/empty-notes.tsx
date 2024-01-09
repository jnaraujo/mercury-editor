import CreateNewNoteButton from "./create-new-note-button";

export default function EmptyNotes() {
  return (
    <div className="flex flex-col justify-center items-center gap-2 h-60">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-zinc-700 dark:text-zinc-300 text-lg font-medium">
          Nenhuma nota encontrada
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
          Crie uma nota para começar
        </p>
      </div>

      <CreateNewNoteButton className="w-44" />
    </div>
  );
}
