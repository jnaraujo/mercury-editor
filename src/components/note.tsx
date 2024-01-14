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
import { archiveNote, unarchiveNote } from "@/lib/notes";
import { getRelativeTimeString } from "@/lib/time";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RenameFileDialog from "./rename-file-dialog";
import { buttonVariants } from "./ui/button";

interface Props {
  title: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  path: string;
  isArchived?: boolean;

  onDelete?: () => void;
}

export default function Note({
  title,
  description,
  createdAt,
  updatedAt,
  path,
  isArchived,
  onDelete,
}: Props) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const navigate = useNavigate();

  return (
    <article className="group flex items-center justify-between gap-4 rounded-md transition-colors duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900">
      <div className="relative w-full space-y-0.5 p-4">
        <h2 className="line-clamp-1 font-medium text-zinc-700 dark:text-zinc-200">
          <Link
            className="rounded-md outline-none ring-zinc-800 focus:ring-2 dark:ring-zinc-600"
            to={{
              pathname: "/editor",
              search: `?path=${encodeURIComponent(path)}`,
            }}
          >
            <span className="absolute inset-0 z-10"></span>
            {title}
          </Link>
        </h2>

        <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300/90">
          {description}
        </p>
        <span className="text-xs text-zinc-600 dark:text-zinc-400">
          Criado em {new Date(createdAt).toLocaleDateString()} • Atualizado{" "}
          {getRelativeTimeString(new Date(updatedAt))}
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="mr-4 flex items-start justify-center rounded-md p-2  outline-none ring-zinc-800 transition-opacity duration-200 focus:outline-none focus:ring-2 dark:ring-zinc-600"
            aria-label="Mais opções"
          >
            <MoreVertical
              className="text-zinc-400 transition-colors duration-200 hover:text-zinc-500"
              size={20}
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => {
              navigate({
                pathname: "/editor",
                search: `?path=${encodeURIComponent(path)}`,
              });
            }}
          >
            Editar
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={() => {
              setOpenRenameDialog(true);
            }}
          >
            Renomear
          </DropdownMenuItem>

          {isArchived ? (
            <DropdownMenuItem
              onSelect={() => {
                unarchiveNote(path);
              }}
            >
              Desarquivar
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onSelect={() => {
                archiveNote(path);
              }}
            >
              Arquivar
            </DropdownMenuItem>
          )}

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
