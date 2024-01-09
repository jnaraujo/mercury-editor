import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { timeSince } from "@/lib/time";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";

interface Props {
  title: string;
  description: string;
  createdAt: number;
  path: string;

  onDelete?: () => void;
}

export default function Note({
  title,
  description,
  createdAt,
  path,
  onDelete,
}: Props) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  return (
    <article className="p-4 dark:hover:bg-zinc-900 rounded-md transition-colors duration-200 hover:bg-zinc-200 flex justify-between items-center gap-4 group">
      <Link
        to="/editor"
        state={{
          path,
        }}
        className="w-full"
      >
        <div className="space-y-0.5">
          <h2 className="dark:text-zinc-200 text-zinc-700 font-medium line-clamp-1">
            {title}
          </h2>

          <p className="text-sm dark:text-zinc-300/90 text-zinc-600 line-clamp-2">
            {description}
          </p>
          <span className="text-xs text-zinc-400">
            Criado em {new Date(createdAt).toLocaleDateString()} • Atualizado há{" "}
            {timeSince(createdAt)}
          </span>
        </div>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="flex items-start justify-center w-10 transition-opacity duration-200 outline-none"
            aria-label="Apagar nota"
          >
            <MoreVertical
              className="text-zinc-400 hover:text-zinc-500 transition-colors duration-200"
              size={20}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer">
            <Link
              to="/editor"
              state={{
                path,
              }}
              className="flex w-full"
            >
              Editar
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => {
              setOpenDeleteDialog(true);
            }}
            className="flex cursor-pointer items-center text-destructive focus:text-destructive dark:text-red-600"
          >
            Apagar nota
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog onOpenChange={setOpenDeleteDialog} open={openDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja apagar a nota?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Ao deletar a nota, ela será
              removida permanentemente do seu dispositivo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className={buttonVariants({ variant: "destructive" })}
              onClick={onDelete}
            >
              Apagar a nota
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </article>
  );
}
