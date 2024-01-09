import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect } from "react";
import BubbleMenu from "./bubble-menu";
import { extensions } from "./extensions";
import FloatingMenu from "./floating-menu";

interface Props {
  content: string;
  onChange?: (html: string) => void;
  focus?: boolean;
}

export default function Editor({ content, onChange, focus }: Props) {
  const editor = useEditor({
    content: content,
    extensions,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.storage.markdown.getMarkdown());
    },
  });

  useEffect(() => {
    if (content && editor) {
      editor.commands.setContent(content, true);
    }
  }, [content, editor]);

  useEffect(() => {
    if (editor && focus) {
      editor.commands.focus();
    }
  }, [focus, editor]);

  return (
    <section className="flex justify-center">
      <EditorContent
        editor={editor}
        className="prose prose-violet w-full max-w-full resize-none dark:prose-invert"
        autoCorrect="false"
        spellCheck="false"
      />

      {editor && <FloatingMenu editor={editor} />}
      {editor && <BubbleMenu editor={editor} />}
    </section>
  );
}
