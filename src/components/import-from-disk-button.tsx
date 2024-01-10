import { randomUUID } from "@/lib/crypto";
import { filenameFromPath } from "@/lib/files";
import { cn } from "@/lib/utils";
import { useNotesStore } from "@/stores/notesStore";
import { open } from "@tauri-apps/api/dialog";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ImportFromDiskButton({ className, ...rest }: Props) {
  const addNote = useNotesStore((state) => state.addNote);
  const findNoteByPath = useNotesStore((state) => state.findNoteByPath);
  const { toast } = useToast();

  async function handleOpenFile() {
    const selected = await open({
      multiple: true,
      filters: [
        {
          name: "Texto",
          extensions: ["txt", "md"],
        },
      ],
    });

    if (!selected || typeof selected === "string") return;

    const notesAlreadyExists: string[] = [];

    selected.forEach((path) => {
      if (findNoteByPath(path)) {
        notesAlreadyExists.push(path);
        return;
      }

      addNote({
        id: randomUUID(),
        title: filenameFromPath(path),
        path,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        description: "",
      });
    });

    if (notesAlreadyExists.length > 0) {
      const s = notesAlreadyExists.map(filenameFromPath).join(", ");
      toast({
        title: "Algumas notas já estão no Mercury",
        description: `Essa(s) nota(s) não foram importadas: ${s}`,
      });
    }
  }
  return (
    <Button
      variant="link"
      className={cn(
        "font-normal dark:text-zinc-300 dark:hover:text-zinc-200",
        className,
      )}
      onClick={handleOpenFile}
      {...rest}
    >
      Importar do disco
    </Button>
  );
}
