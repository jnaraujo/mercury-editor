import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect } from "react";
import BubbleMenu from "./bubble-menu";
import { extensions } from "./extensions";
import FloatingMenu from "./floating-menu";

interface Props {
  content: string;
}

export default function Editor({ content }: Props) {
  const editor = useEditor({
    content: content,
    extensions,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });

  useEffect(() => {
    if (content && editor) {
      editor.commands.setContent(content, true);
    }
  }, [content, editor]);

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