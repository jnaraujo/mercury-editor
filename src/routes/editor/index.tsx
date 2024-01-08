import Editor from "@/components/editor";
import { notesStore } from "@/stores/notesStore";
import { readTextFile } from "@tauri-apps/api/fs";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import { Link, redirect, useParams } from "react-router-dom";

export const Component = function EditorPage() {
  const [content, setContent] = useState("");
  const findNote = notesStore((state) => state.findNote);
  const { slug } = useParams();

  const note = findNote(slug as string);

  useEffect(() => {
    appWindow.setTitle(`${slug} - Mercury`);
  }, [slug]);

  useEffect(() => {
    if (!note) return;

    readTextFile(note.path as string).then(setContent);
  }, [note]);

  if (!slug || !note) {
    return redirect("/");
  }

  return (
    <div className="container max-w-screen-md py-6 space-y-8">
      <header className="flex justify-between items-center h-10">
        <Link to="/" className="text-zinc-500 text-sm">
          {"<"} Voltar
        </Link>

        <span className="text-zinc-700 text-sm dark:text-zinc-500">
          Atualizado em {note.updatedAt}
        </span>
      </header>

      <main className="flex flex-col justify-center">
        <Editor content={content} />
      </main>
    </div>
  );
};
