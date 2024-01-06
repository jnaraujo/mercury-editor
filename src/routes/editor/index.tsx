import Editor from "@/editor";
import { FileRoute } from "@tanstack/react-router";

function EditorPage() {
  return (
    <main className="container flex max-w-screen-md flex-col justify-center pt-8">
      <Editor />
    </main>
  );
}

export const Route = new FileRoute("/editor/").createRoute({
  component: EditorPage,
});
