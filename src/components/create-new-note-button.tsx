import { cn } from "@/lib/utils";
import { useCreateNewNoteDialogStore } from "@/stores/createNewNoteDialogStore";
import { Button } from "./ui/button";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

export default function CreateNewNoteButton({ className, ...rest }: Props) {
  const setOpen = useCreateNewNoteDialogStore((state) => state.setOpen);

  return (
    <Button
      className={cn("h-9", className)}
      onClick={() => setOpen(true)}
      {...rest}
    >
      Criar nota
    </Button>
  );
}
