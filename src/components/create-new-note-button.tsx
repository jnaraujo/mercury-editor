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
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

export default function CreateNewNoteButton({ className, ...rest }: Props) {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const { createNote } = useNotes();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const filename = formData.get("filename") as string;

    try {
      await createNote(filename);
      navigate(`/editor/${filename}`);
    } catch (error) {
      if (error instanceof NoteAlreadyExistsError) {
        setError("Já existe uma nota com esse nome.");
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "bg-transparent hover:bg-zinc-200/50 dark:hover:bg-zinc-800",
            className,
          )}
          {...rest}
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
