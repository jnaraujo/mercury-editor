import { EditorContent, useEditor } from "@tiptap/react";
import BubbleMenu from "./bubble-menu";
import { extensions } from "./extensions";
import FloatingMenu from "./floating-menu";
import { initialContent } from "./initialContent";

export default function Editor() {
  const editor = useEditor({
    content: initialContent,
    extensions,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });

  return (
    <section className="flex justify-center">
      <EditorContent
        editor={editor}
        className="prose prose-violet dark:prose-invert resize-none w-full max-w-full"
        autoCorrect="false"
        spellCheck="false"
      />

      {editor && <FloatingMenu editor={editor} />}
      {editor && <BubbleMenu editor={editor} />}
    </section>
  );
}
