import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import * as Popover from "@radix-ui/react-popover";
import { isNodeSelection, posToDOMRect } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import {
  Bold,
  Heading1,
  Heading2,
  List,
  MessageSquare,
  Type,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface Props {
  editor: Editor;
}

export default function FloatingMenu({ editor }: Props) {
  const [open, setOpen] = useState(false);

  const runCommand = useCallback(
    (command: () => unknown, close = true) => {
      if (close) {
        setOpen(false);
      }
      command();
    },
    [setOpen],
  );

  useEffect(() => {
    function handle(event: KeyboardEvent) {
      if (event.code == "Slash") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, []);

  function handleClose() {
    setOpen(false);
  }

  return (
    <Popover.Root open={open} defaultOpen={false}>
      <Popover.Anchor asChild>
        <div
          className="fixed z-50"
          style={{
            top: getPosition(editor).top,
            left: getPosition(editor).left,
          }}
        />
      </Popover.Anchor>
      <Popover.Portal>
        <Popover.Content
          align="start"
          side="bottom"
          sideOffset={32}
          onEscapeKeyDown={handleClose}
          onPointerDownOutside={handleClose}
        >
          <Command>
            <CommandInput placeholder="Procure por algo" />
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

            <CommandGroup>
              <CommandItem
                value="título"
                onSelect={() =>
                  runCommand(() => {
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                  })
                }
              >
                <Heading1 size={16} className="mr-2" />
                <span>Título</span>
              </CommandItem>

              <CommandItem
                value="subtítulo"
                onSelect={() =>
                  runCommand(() => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                  })
                }
              >
                <Heading2 size={16} className="mr-2" />
                Subtítulo
              </CommandItem>

              <CommandItem
                value="parágrafo"
                onSelect={() =>
                  runCommand(() => {
                    editor.chain().focus().setParagraph().run();
                  })
                }
              >
                <Type size={16} className="mr-2" />
                Parágrafo
              </CommandItem>

              <CommandItem
                value="bold"
                onSelect={() =>
                  runCommand(() => {
                    editor.chain().focus().toggleBold().run();
                  })
                }
              >
                <Bold size={16} className="mr-2" />
                Bold
              </CommandItem>

              <CommandItem
                value="lista"
                onSelect={() =>
                  runCommand(() => {
                    editor.chain().focus().toggleBulletList().run();
                  })
                }
              >
                <List size={16} className="mr-2" />
                Lista
              </CommandItem>

              <CommandItem
                value="citação"
                onSelect={() =>
                  runCommand(() => {
                    editor.chain().focus().toggleBlockquote().run();
                  })
                }
              >
                <MessageSquare size={16} className="mr-2" />
                Citação
              </CommandItem>
            </CommandGroup>
          </Command>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
function getPosition(editor: Editor) {
  const { ranges } = editor.state.selection;

  const from = Math.min(...ranges.map((range) => range.$from.pos));
  const to = Math.max(...ranges.map((range) => range.$to.pos));

  if (isNodeSelection(editor.state.selection)) {
    const node = editor.view.nodeDOM(from) as HTMLElement;

    if (node) {
      const { top, left } = node.getBoundingClientRect();

      return { top, left };
    }
  }

  const { top, left } = posToDOMRect(editor.view, from, to);

  return { top, left };
}
