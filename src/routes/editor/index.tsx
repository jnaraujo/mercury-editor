import Editor from "@/components/editor";
import { useNotes } from "@/hooks/useNotes";
import { hash } from "@/lib/crypto";
import { timeSince } from "@/lib/time";
import { notesStore } from "@/stores/notesStore";
import { readTextFile } from "@tauri-apps/api/fs";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useMemo, useState } from "react";
import { Link, redirect, useParams } from "react-router-dom";

export const Component = function EditorPage() {
  const [initialContent, setInitialContent] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [oldContentHash, setOldContentHash] = useState<string>("" as string);
  const { slug } = useParams();
  const findNote = notesStore((state) => state.findNote);
  const { updateNote } = useNotes();

  const note = findNote(slug as string);

  const wasModified = oldContentHash !== hash(updatedContent);

  useEffect(() => {
    appWindow.setTitle(`${slug} - Mercury`);
  }, [slug]);

  useEffect(() => {
    if (!note) return;
    if (initialContent) return;

    readTextFile(note.path as string).then((value) => {
      setInitialContent(value);
      setOldContentHash(hash(value));
    });
  }, [initialContent, note]);

  useEffect(() => {
    function handleSave(event: KeyboardEvent) {
      if (!note) return;

      if (event.code === "KeyS" && event.ctrlKey) {
        event.preventDefault();

        if (wasModified) {
          updateNote(note.path, updatedContent).then(() => {
            setOldContentHash(hash(updatedContent));
          });
        }
      }
    }

    window.addEventListener("keydown", handleSave);

    return () => {
      window.removeEventListener("keydown", handleSave);
    };
  }, [updatedContent, wasModified, note, updateNote]);

  const timeSinceUpdate = useMemo(() => {
    return timeSince(note?.updatedAt as number);
  }, [note]);

  if (!note) {
    return redirect("/");
  }

  return (
    <div className="container max-w-screen-md py-6 space-y-8">
      <header className="flex justify-between items-center h-10">
        <Link to="/" className="text-zinc-500 text-sm">
          {"<"} Voltar
        </Link>

        <div className="space-x-2">
          <span className="text-zinc-700 text-sm dark:text-zinc-500">
            {wasModified ? "Modificado" : "Salvo"}
          </span>
          <span>•</span>
          <span className="text-zinc-700 text-sm dark:text-zinc-500">
            Atualizado há {timeSinceUpdate}
          </span>
        </div>
      </header>

      <main className="flex flex-col justify-center">
        <Editor content={initialContent} onChange={setUpdatedContent} />
      </main>
    </div>
  );
};
