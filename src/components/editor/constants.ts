import { type Editor } from "@tiptap/react";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  MessageSquare,
  Strikethrough,
  Type,
  Underline,
} from "lucide-react";
import { type ElementType } from "react";

interface MenuItem {
  title: string;
  onSelect: (editor: Editor) => void;
  icon: ElementType;
}

export const headingItems: MenuItem[] = [
  {
    title: "Título",
    onSelect: (editor) => {
      editor.chain().focus().toggleHeading({ level: 1 }).run();
    },
    icon: Heading1,
  },
  {
    title: "Título 2",
    onSelect: (editor) => {
      editor.chain().focus().toggleHeading({ level: 2 }).run();
    },
    icon: Heading2,
  },
  {
    title: "Título 3",
    onSelect: (editor) => {
      editor.chain().focus().toggleHeading({ level: 3 }).run();
    },
    icon: Heading3,
  },
  {
    title: "Parágrafo",
    onSelect: (editor) => {
      editor.chain().focus().setParagraph().run();
    },
    icon: Type,
  },
];

export const formattingItems: MenuItem[] = [
  {
    title: "Bold",
    onSelect: (editor) => {
      editor.chain().focus().toggleBold().run();
    },
    icon: Bold,
  },
  {
    title: "Itálico",
    onSelect: (editor) => {
      editor.chain().focus().toggleItalic().run();
    },
    icon: Italic,
  },
  {
    title: "Sublinhado",
    onSelect: (editor) => {
      editor.chain().focus().toggleUnderline().run();
    },
    icon: Underline,
  },
  {
    title: "Riscado",
    onSelect: (editor) => {
      editor.chain().focus().toggleStrike().run();
    },
    icon: Strikethrough,
  },
];

export const otherItems: MenuItem[] = [
  {
    title: "Lista",
    onSelect: (editor) => {
      editor.chain().focus().toggleBulletList().run();
    },
    icon: List,
  },
  {
    title: "Lista numerada",
    onSelect: (editor) => {
      editor.chain().focus().toggleOrderedList().run();
    },
    icon: ListOrdered,
  },
  {
    title: "Citação",
    onSelect: (editor) => {
      editor.chain().focus().toggleBlockquote().run();
    },
    icon: MessageSquare,
  },
];
