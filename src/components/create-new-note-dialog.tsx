import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NoteAlreadyExistsError } from "@/errors/note-already-exists";
import { randomUUID } from "@/lib/crypto";
import { createFile, getDocumentsDirPath } from "@/lib/files";
import { addNote } from "@/lib/notes";
import { useCreateNewNoteDialogStore } from "@/stores/createNewNoteDialogStore";
import { normalize } from "@tauri-apps/api/path";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function CreateNewNoteDialog() {
  const open = useCreateNewNoteDialogStore((state) => state.open);
  const setOpen = useCreateNewNoteDialogStore((state) => state.setOpen);

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const filename = formData.get("filename") as string;

    try {
      const path = await normalize(
        `${await getDocumentsDirPath()}/notes/${filename}.md`,
      );

      await createFile(path, "");

      addNote({
        id: randomUUID(),
        path,
        title: `${filename}.md`,
        description: "",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isArchived: false,
        isPinned: false,
      });

      navigate(`/editor`, {
        state: { path },
      });
      setOpen(false);
    } catch (error) {
      if (error instanceof NoteAlreadyExistsError) {
        setError("Já existe uma nota com esse nome.");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

            {error && <span className="text-sm text-red-500">{error}</span>}
          </div>

          <DialogFooter>
            <Button type="submit">Criar nota</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
