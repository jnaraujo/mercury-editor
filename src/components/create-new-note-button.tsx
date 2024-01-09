import { cn } from "@/lib/utils";
import { useCreateNewNoteDialogStore } from "@/stores/createNewNoteDialogStore";
import { Button } from "./ui/button";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

export default function CreateNewNoteButton({ className, ...rest }: Props) {
  const setOpen = useCreateNewNoteDialogStore((state) => state.setOpen);

  return (
    <Button
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-zinc-200/50 dark:hover:bg-zinc-800",
        className,
      )}
      onClick={() => setOpen(true)}
      {...rest}
    >
      Criar nota
    </Button>
  );
}
