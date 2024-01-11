import Editor from "@/components/editor";
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
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { hash } from "@/lib/crypto";
import { findNoteByPath, updateNoteFile } from "@/lib/notes";
import { getRelativeTimeString } from "@/lib/time";
import { window as TauriWindow } from "@tauri-apps/api";
import { TauriEvent } from "@tauri-apps/api/event";
import { readTextFile } from "@tauri-apps/api/fs";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import { Link, useBlocker, useLocation, useNavigate } from "react-router-dom";

export const Component = function EditorPage() {
  const [open, setOpen] = useState(false);
  const [requestCloseWindow, setRequestCloseWindow] = useState(false);
  const [initialContent, setInitialContent] = useState<string>("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [focusEditor, setFocusEditor] = useState(false);
  const [oldContentHash, setOldContentHash] = useState("");
  const [updatedContentHash, setUpdatedContentHash] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const note = findNoteByPath(location.state.path as string);
  const wasModified = oldContentHash !== updatedContentHash;

  useEffect(() => {
    if (!note) {
      navigate("/");
    }
  }, [navigate, note]);

  useEffect(() => {
    if (!note?.title || !note?.path) return;

    appWindow.setTitle(`${note.title} - Mercury`);

    readTextFile(note.path as string).then((value) => {
      setInitialContent(value);
      setUpdatedContentHash(hash(value));
      setOldContentHash(hash(value));
      if (value === "") {
        setFocusEditor(true);
      }
    });
  }, [note?.title, note?.path]);

  useEffect(() => {
    setUpdatedContentHash(hash(updatedContent));
  }, [updatedContent]);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      wasModified && currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      setOpen(true);
    }
  }, [blocker.state]);

  useEffect(() => {
    function handleSave(event: KeyboardEvent) {
      if (!note?.path) return;

      if (event.code === "KeyS" && event.ctrlKey && !event.shiftKey) {
        event.preventDefault();

        if (wasModified) {
          updateNoteFile(note.path, updatedContent).then(() => {
            const updatedContentHash = hash(updatedContent);
            setUpdatedContentHash(updatedContentHash);
            setOldContentHash(updatedContentHash);
          });
        }
      }
    }
    window.addEventListener("keydown", handleSave);
    return () => {
      window.removeEventListener("keydown", handleSave);
    };
  }, [updatedContent, wasModified, note?.path]);

  useEffect(() => {
    const unlisten = TauriWindow.getCurrent().listen(
      TauriEvent.WINDOW_CLOSE_REQUESTED,
      () => {
        if (wasModified) {
          setRequestCloseWindow(true);
          setOpen(true);
          return;
        }

        TauriWindow.getCurrent().close();
      },
    );

    function handleBeforeUnload(event: BeforeUnloadEvent) {
      if (wasModified) {
        event.preventDefault();
        event.returnValue = "";
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      unlisten.then((unlisten) => unlisten());
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [wasModified]);

  return (
    <div className="flex h-full flex-col space-y-2 overflow-auto">
      <header className="sticky top-0 z-20 bg-zinc-100 shadow-sm dark:bg-zinc-950">
        <nav className="container flex h-16 max-w-screen-md items-center justify-between">
          <Link to="/" className="text-sm text-zinc-500">
            {"<"} Voltar
          </Link>

          <span className="text-sm text-zinc-700 dark:text-zinc-500">
            {wasModified ? "Modificado" : "Salvo"} {" • "} Atualizado{" "}
            {getRelativeTimeString(new Date(note?.updatedAt as number))}
          </span>
        </nav>
      </header>

      <ScrollArea className="mx-auto w-full max-w-screen-md">
        <main className="container max-w-screen-md">
          <Editor
            content={initialContent}
            onChange={setUpdatedContent}
            focus={focusEditor}
          />
        </main>
      </ScrollArea>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja sair?</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem alterações não salvas. Por favor, salve antes de sair.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                blocker?.reset?.();
                setRequestCloseWindow(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={buttonVariants({
                variant: "destructive",
              })}
              onClick={() => {
                blocker?.proceed?.();

                if (requestCloseWindow) {
                  TauriWindow.getCurrent().close();
                }
              }}
            >
              Sair sem salvar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
