import { randomUUID } from "@/lib/crypto";
import { filenameFromPath, requestNotesFromDisk } from "@/lib/files";
import { addNotesIfNotExists, findNoteByPath } from "@/lib/notes";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ImportFromDiskButton({ className, ...rest }: Props) {
  const { toast } = useToast();

  async function handleOpenFile() {
    const selected = await requestNotesFromDisk();

    if (!selected) return;

    const notesAlreadyExists: string[] = selected.filter((path) =>
      findNoteByPath(path),
    );

    addNotesIfNotExists(
      selected.map((path) => ({
        id: randomUUID(),
        title: filenameFromPath(path),
        path,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        description: "",
      })),
    );

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
