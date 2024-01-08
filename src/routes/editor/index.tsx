import Editor from "@/editor";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const Component = function EditorPage() {
  const { slug } = useParams();

  useEffect(() => {
    appWindow.setTitle(`${slug} - Mercury`);
  }, [slug]);

  return (
    <div className="container max-w-screen-md py-6 space-y-8">
      <header className="flex justify-between items-center h-10">
        <Link to="/" className="text-zinc-500 text-sm">
          {"<"} Voltar
        </Link>
      </header>

      <main className="flex flex-col justify-center">
        <Editor />
      </main>
    </div>
  );
};
