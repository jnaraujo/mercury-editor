import CommandShortcut from "@/components/command-shortcut";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as SelectPrimitive from "@radix-ui/react-select";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { BubbleMenu as TiptapBubbleMenu, type Editor } from "@tiptap/react";
import { Bold, Italic, RemoveFormatting, Type } from "lucide-react";
import { useRef } from "react";

interface Props {
  editor: Editor;
}

export default function BubbleMenu({ editor }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  function handleSelect(value: string) {
    switch (value) {
      case "paragraph":
        editor.chain().focus().setParagraph().run();
        break;
      case "title":
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case "subtitle":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "list":
        editor.chain().focus().toggleBulletList().run();
        break;
    }
  }

  function getCurrentValue() {
    if (editor.isActive("heading", { level: 1 })) {
      return "título";
    }
    if (editor.isActive("heading", { level: 2 })) {
      return "subtítulo";
    }
    if (editor.isActive("paragraph")) {
      return "parágrafo";
    }
    if (editor.isActive("bold")) {
      return "bold";
    }
    if (editor.isActive("bulletList")) {
      return "lista";
    }
    if (editor.isActive("blockquote")) {
      return "citação";
    }
    return "";
  }

  return (
    <TiptapBubbleMenu
      editor={editor}
      tippyOptions={{
        duration: 100,
        delay: 250,
        offset: [0, 8],
        placement: "top",
      }}
      updateDelay={0}
    >
      <div
        className="h-7 w-fit overflow-hidden rounded-md border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 flex items-center justify-center"
        ref={containerRef}
      >
        <div className="mx-2">
          <Select onValueChange={handleSelect} defaultValue={getCurrentValue()}>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SelectTrigger className="h-5 bg-transparent gap-1 border-none px-1 focus:ring-offset-0">
                    <Type size={14} />
                  </SelectTrigger>
                </TooltipTrigger>

                <TooltipContent className="text-xs space-y-1">
                  <b className="font-medium">Transformar em:</b>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <SelectPrimitive.Portal container={containerRef.current}>
              <SelectContent className="w-fit">
                <SelectGroup>
                  <SelectLabel>Selecione um tipo</SelectLabel>
                  <SelectItem value="title">Título</SelectItem>
                  <SelectItem value="subtitle">Subtítulo</SelectItem>
                  <SelectItem value="paragraph">Parágrafo</SelectItem>
                  <SelectItem value="list">Lista</SelectItem>
                </SelectGroup>
              </SelectContent>
            </SelectPrimitive.Portal>
          </Select>
        </div>

        <div className="h-full w-[1px] bg-zinc-200 dark:bg-zinc-700" />

        <div className="flex h-full justify-between items-center gap-4 mx-3 ml-3">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="w-full flex items-center justify-center"
                  onClick={() => {
                    editor.chain().toggleBold().run();
                  }}
                >
                  <Bold size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="text-xs space-y-1">
                <b className="font-medium">Negrito</b>
                <CommandShortcut>Ctrl + B</CommandShortcut>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="w-full flex items-center justify-center"
                  onClick={() => {
                    editor.chain().focus().toggleItalic().run();
                  }}
                >
                  <Italic size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="text-xs space-y-1">
                <b className="font-medium">Itálico</b>
                <CommandShortcut>Ctrl + I</CommandShortcut>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="w-full flex items-center justify-center"
                  onClick={() => {
                    editor.chain().focus().unsetAllMarks().run();
                  }}
                >
                  <RemoveFormatting size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="text-xs space-y-1">
                <b className="font-medium">Remover formatação</b>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </TiptapBubbleMenu>
  );
}
