import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect } from "react";
import BubbleMenu from "./bubble-menu";
import styles from "./editor.module.css";
import { extensions } from "./extensions";
import { FloatingMenu } from "./floating-menu";

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
    if (editor) {
      editor.commands.setContent(content, true);
    }
  }, [content, editor]);

  useEffect(() => {
    if (editor && focus) {
      editor.commands.focus();
    }
  }, [focus, editor]);

  return (
    <section className="flex h-fit justify-center overflow-hidden">
      <EditorContent
        editor={editor}
        className={`${styles.editor} prose prose-sm prose-violet w-full max-w-full resize-none dark:prose-invert`}
        autoCorrect="false"
        spellCheck="false"
      />

      {editor && <FloatingMenu editor={editor} />}
      {editor && <BubbleMenu editor={editor} />}
    </section>
  );
}
