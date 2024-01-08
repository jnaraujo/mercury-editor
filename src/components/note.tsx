import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash } from "lucide-react";
import { buttonVariants } from "./ui/button";

interface Props {
  title: string;
  description: string;
  tags: string[];
  createdAt: string;

  onDelete?: () => void;
}

export default function Note({
  title,
  description,
  tags,
  createdAt,
  onDelete,
}: Props) {
  return (
    <article className="p-4 dark:hover:bg-zinc-900 rounded-md transition-colors duration-200 hover:bg-zinc-200 flex justify-between items-center gap-4 group">
      <a href="#">
        <div className="space-y-0.5">
          <h2 className="dark:text-zinc-200 text-zinc-700 font-medium line-clamp-1">
            {title}
          </h2>

          <p className="text-sm dark:text-zinc-300/90 text-zinc-600 line-clamp-2">
            {description}
          </p>
          <span className="text-xs text-zinc-400">
            Criado em {createdAt} - {tags.join(", ")}
          </span>
        </div>
      </a>

      <AlertDialog>
        <AlertDialogTrigger>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="opacity-0 group-hover:opacity-100 flex items-start justify-center w-10 transition-opacity duration-200 outline-none">
                  <Trash
                    className="text-zinc-400 hover:text-red-700/80 transition-colors duration-200"
                    size={20}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <span className="text-zinc-400 text-xs">Excluir nota</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </AlertDialogTrigger>
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
