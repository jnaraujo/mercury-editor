import Editor from "@/components/editor";
import { useNotes } from "@/hooks/useNotes";
import { hash } from "@/lib/crypto";
import { getRelativeTimeString } from "@/lib/time";
import { useNotesStore } from "@/stores/notesStore";
import { readTextFile } from "@tauri-apps/api/fs";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Component = function EditorPage() {
  const [initialContent, setInitialContent] = useState<string>("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [focusEditor, setFocusEditor] = useState(false);
  const {
    state: { path },
  } = useLocation();
  const findNoteByPath = useNotesStore((state) => state.findNoteByPath);
  const { updateNote } = useNotes();
  const navigate = useNavigate();
  const [oldContentHash, setOldContentHash] = useState("");
  const [updatedContentHash, setUpdatedContentHash] = useState("");

  const note = findNoteByPath(path as string);
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

  useEffect(() => {
    function handleSave(event: KeyboardEvent) {
      if (!note?.path) return;

      if (event.code === "KeyS" && event.ctrlKey) {
        event.preventDefault();

        if (wasModified) {
          updateNote(note.path, updatedContent).then(() => {
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
  }, [updatedContent, wasModified, note?.path, updateNote]);

  useEffect(() => {
    console.log(initialContent);
  }, [initialContent]);
  return (
    <div className="h-full space-y-2 overflow-auto">
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

      <main className="container mb-4 flex max-w-screen-md flex-col justify-center">
        <Editor
          content={initialContent}
          onChange={setUpdatedContent}
          focus={focusEditor}
        />
      </main>
    </div>
  );
};
