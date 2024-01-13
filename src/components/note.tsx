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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { removeNote } from "@/lib/notes";
import { getRelativeTimeString } from "@/lib/time";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import RenameFileDialog from "./rename-file-dialog";
import { buttonVariants } from "./ui/button";

interface Props {
  title: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  path: string;

  onDelete?: () => void;
}

export default function Note({
  title,
  description,
  createdAt,
  updatedAt,
  path,
  onDelete,
}: Props) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);

  return (
    <article
      className="group flex items-center justify-between gap-4 rounded-md ring-inset ring-zinc-300 transition-colors duration-200 hover:bg-zinc-200 focus:outline-none focus:ring-1 dark:ring-zinc-800 dark:hover:bg-zinc-900"
      tabIndex={0}
    >
      <Link
        to="/editor"
        state={{
          path,
        }}
        className="w-full p-4"
        tabIndex={-1}
      >
        <div className="space-y-0.5">
          <h2 className="line-clamp-1 font-medium text-zinc-700 dark:text-zinc-200">
            {title}
          </h2>

          <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300/90">
            {description}
          </p>
          <span className="text-xs text-zinc-400">
            Criado em {new Date(createdAt).toLocaleDateString()} • Atualizado{" "}
            {getRelativeTimeString(new Date(updatedAt))}
          </span>
        </div>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="mr-4 flex items-start justify-center rounded-md p-2 outline-none ring-zinc-300 transition-opacity duration-200 focus:outline-none focus:ring-1 dark:ring-zinc-800"
            aria-label="Apagar nota"
          >
            <MoreVertical
              className="text-zinc-400 transition-colors duration-200 hover:text-zinc-500"
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

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={() => {
              setOpenRenameDialog(true);
            }}
          >
            Renomear
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => {
              removeNote(path);
            }}
          >
            Remover da lista
          </DropdownMenuItem>

          <DropdownMenuSeparator />

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

      <RenameFileDialog
        noteName={title}
        notePath={path}
        open={openRenameDialog}
        onOpenChange={setOpenRenameDialog}
      />
    </article>
  );
}
