import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

export const extensions = [
  StarterKit,
  Heading.configure({
    levels: [1, 2],
  }),
  Placeholder.configure({
    placeholder: `Clique em "/" para abrir o menu de comandos`,
    emptyNodeClass: `before:content-[attr(data-placeholder)] before:float-left before:h-0 before:pointer-events-none before:text-zinc-300 before:dark:text-zinc-600`,
  }),
];
