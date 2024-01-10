import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";

export const extensions = [
  StarterKit.configure({
    history: {
      depth: 20,
    },
  }),
  Markdown,
  Underline,
  Placeholder.configure({
    placeholder: `Clique em "/" para abrir o menu de comandos`,
    emptyNodeClass: `before:content-[attr(data-placeholder)] before:float-left before:h-0 before:pointer-events-none before:text-zinc-300 before:dark:text-zinc-600`,
  }),
];
