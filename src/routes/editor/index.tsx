import Editor from "@/components/editor";
import { useNotes } from "@/hooks/useNotes";
import { hash } from "@/lib/crypto";
import { timeSince } from "@/lib/time";
import { notesStore } from "@/stores/notesStore";
import { readTextFile } from "@tauri-apps/api/fs";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const Component = function EditorPage() {
  const [initialContent, setInitialContent] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [oldContentHash, setOldContentHash] = useState<string>("" as string);
  const [focusEditor, setFocusEditor] = useState(false);
  const { slug } = useParams();
  const findNote = notesStore((state) => state.findNote);
  const { updateNote } = useNotes();
  const navigate = useNavigate();

  const note = findNote(slug as string);

  const wasModified = hash(updatedContent) !== oldContentHash;

  useEffect(() => {
    appWindow.setTitle(`${slug} - Mercury`);
  }, [slug]);

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
    <div className="space-y-2">
      <header className="top-0 sticky bg-zinc-100 dark:bg-zinc-950 z-20 shadow-sm">
        <div className="max-w-screen-md container justify-between flex items-center h-16">
          <Link to="/" className="text-zinc-500 text-sm">
            {"<"} Voltar
          </Link>

          <span className="text-zinc-700 text-sm dark:text-zinc-500">
            {wasModified ? "Modificado" : "Salvo"} {" • "} Atualizado há{" "}
            {timeSinceUpdate}
          </span>
        </div>
      </header>

      <main className="flex flex-col justify-center container max-w-screen-md">
        <Editor
          content={initialContent}
          onChange={setUpdatedContent}
          focus={focusEditor}
        />
      </main>
    </div>
  );
};
