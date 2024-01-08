import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { NoteAlreadyExistsError } from "@/errors/note-already-exists";
import { useNotes } from "@/hooks/useNotes";
import { useState } from "react";

export default function CreateNewNoteButton() {
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const { createNote } = useNotes();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const filename = formData.get("filename") as string;

    try {
      await createNote(filename);
      setOpen(false);
    } catch (error) {
      if (error instanceof NoteAlreadyExistsError) {
        setError("Já existe uma nota com esse nome.");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-transparent hover:bg-zinc-200/50 dark:hover:bg-zinc-800"
        >
          Criar nota
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Qual o nome da nota?</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Input
              required
              id="name"
              name="filename"
              placeholder="Ex: minha nova nota"
              autoComplete="off"
            />

            {error && <span className="text-red-500 text-sm">{error}</span>}
          </div>

          <DialogFooter>
            <Button type="submit">Criar nota</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}