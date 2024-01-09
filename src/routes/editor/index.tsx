import Editor from "@/components/editor";
import { useNotes } from "@/hooks/useNotes";
import { hash } from "@/lib/crypto";
import { timeSince } from "@/lib/time";
import { useNotesStore } from "@/stores/notesStore";
import { readTextFile } from "@tauri-apps/api/fs";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Component = function EditorPage() {
  const [initialContent, setInitialContent] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [oldContentHash, setOldContentHash] = useState<string>("" as string);
  const [focusEditor, setFocusEditor] = useState(false);
  const {
    state: { path },
  } = useLocation();
  const findNoteByPath = useNotesStore((state) => state.findNoteByPath);
  const { updateNote } = useNotes();
  const navigate = useNavigate();

  const note = findNoteByPath(path as string);
  const wasModified = hash(updatedContent) !== oldContentHash;

  useEffect(() => {
    appWindow.setTitle(`${note?.title} - Mercury`);
    setInitialContent("");
  }, [note]);

  useEffect(() => {
    if (!note) {
      return navigate("/");
    }

    if (initialContent) return;

    readTextFile(note.path as string).then((value) => {
      setInitialContent(value);
      setUpdatedContent(value);
      setOldContentHash(hash(value));

      if (value === "") {
        setFocusEditor(true);
      }
    });
  }, [initialContent, navigate, note]);

  useEffect(() => {
    function handleSave(event: KeyboardEvent) {
      if (!note) return;

      if (event.code === "KeyS" && event.ctrlKey) {
        event.preventDefault();

        if (wasModified) {
          console.time("updateNote");
          updateNote(note.path, updatedContent).then(() => {
            console.timeEnd("updateNote");

            console.time("hash");
            setOldContentHash(hash(updatedContent));
            console.timeEnd("hash");
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
    if (!note) return null;

    return timeSince(note?.updatedAt as number);
  }, [note]);

  return (
    <div className="h-full space-y-2 overflow-auto">
      <header className="sticky top-0 z-20 bg-zinc-100 shadow-sm dark:bg-zinc-950">
        <nav className="container flex h-16 max-w-screen-md items-center justify-between">
          <Link to="/" className="text-sm text-zinc-500">
            {"<"} Voltar
          </Link>

          <span className="text-sm text-zinc-700 dark:text-zinc-500">
            {wasModified ? "Modificado" : "Salvo"} {" • "} Atualizado há{" "}
            {timeSinceUpdate}
          </span>
        </nav>
      </header>

      <main className="container flex max-w-screen-md flex-col justify-center">
        <Editor
          content={initialContent}
          onChange={setUpdatedContent}
          focus={focusEditor}
        />
      </main>
    </div>
  );
};
