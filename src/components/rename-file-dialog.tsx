import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileAlreadyExistsError } from "@/errors/file-already-exists";
import { renameFile } from "@/lib/files";
import { findNoteByPath, updateNote } from "@/lib/notes";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
  noteName: string;
  notePath: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export default function RenameFileDialog({
  onOpenChange,
  open,
  noteName,
  notePath: oldPath,
}: Props) {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const filename = formData.get("filename") as string;

    const note = findNoteByPath(oldPath);

    if (!note) {
      setError("Não foi possível encontrar a nota.");
      return;
    }

    try {
      await renameFile(oldPath, filename);
      updateNote(oldPath, {
        ...note,
        title: filename,
        path: filename,
      });

      onOpenChange(false);
    } catch (error) {
      if (error instanceof FileAlreadyExistsError) {
        setError("Já existe uma nota com esse nome.");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Renomar nota</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Input
              required
              id="name"
              name="filename"
              placeholder="Ex: new_name.md"
              autoComplete="off"
              defaultValue={noteName}
            />

            {error && <span className="text-sm text-red-500">{error}</span>}
          </div>

          <DialogFooter>
            <Button type="submit">Renomear</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
