import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import * as Popover from "@radix-ui/react-popover";
import { isNodeSelection, posToDOMRect } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import { useCallback, useEffect, useState } from "react";
import { formattingItems, headingItems, otherItems } from "./constants";

interface Props {
  editor: Editor;
}

export function FloatingMenu({ editor }: Props) {
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
      if (
        event.code == "Slash" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.shiftKey
      ) {
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
          className="absolute z-[1000]"
          style={{
            top: getPosition(editor).top,
            left: getPosition(editor).left,
          }}
        />
      </Popover.Anchor>
      <Popover.Portal>
        <Popover.Content
          align="center"
          side="bottom"
          onEscapeKeyDown={handleClose}
          onPointerDownOutside={handleClose}
        >
          <Command>
            <CommandInput placeholder="Procure por algo" />
            <CommandList>
              <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

              <CommandGroup>
                {headingItems.map(({ title, onSelect, icon: Icon }) => (
                  <CommandItem
                    value={title}
                    onSelect={() =>
                      runCommand(() => {
                        onSelect(editor);
                      })
                    }
                    key={title}
                  >
                    <Icon size={16} className="mr-2" />
                    {title}
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup>
                {formattingItems.map(({ title, onSelect, icon: Icon }) => (
                  <CommandItem
                    value={title}
                    onSelect={() =>
                      runCommand(() => {
                        onSelect(editor);
                      })
                    }
                    key={title}
                  >
                    <Icon size={16} className="mr-2" />
                    {title}
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup>
                {otherItems.map(({ title, onSelect, icon: Icon }) => (
                  <CommandItem
                    value={title}
                    onSelect={() =>
                      runCommand(() => {
                        onSelect(editor);
                      })
                    }
                    key={title}
                  >
                    <Icon size={16} className="mr-2" />
                    {title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
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
