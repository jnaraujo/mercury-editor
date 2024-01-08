import Editor from "@/editor";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const Component = function EditorPage() {
  const { slug } = useParams();

  useEffect(() => {
    appWindow.setTitle(`${slug} - Mercury`);
  }, [slug]);

  return (
    <main className="container flex max-w-screen-md flex-col justify-center py-8">
      <Editor />
    </main>
  );
};
