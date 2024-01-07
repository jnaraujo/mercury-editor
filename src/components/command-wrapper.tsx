import { useCommandStore } from "@/stores/commandStore";
import { useConfigStore } from "@/stores/configStore";
import { open as openExternalLink } from "@tauri-apps/api/shell";
import { appWindow } from "@tauri-apps/api/window";
import {
  ExternalLink,
  FolderOpen,
  Fullscreen,
  Newspaper,
  SunMoon,
} from "lucide-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./ui/command";

export default function CommandWrapper() {
  const { open, setOpen } = useCommandStore();
  const setTheme = useConfigStore((state) => state.setTheme);
  const navigate = useNavigate();

  const runCommand = useCallback(
    (command: () => unknown, close = true) => {
      if (close) {
        setOpen(false);
      }
      command();
    },
    [setOpen],
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Digite um comando ou pesquise por algo" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Sugestões">
          <CommandItem onSelect={() => runCommand(() => navigate("/editor"))}>
            <Newspaper className="mr-2 h-4 w-4 shrink-0" />
            <span>Blog</span>
          </CommandItem>
          <CommandItem>
            <FolderOpen className="mr-2 h-4 w-4 shrink-0" />
            <span>Projetos</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Links">
          <CommandItem
            onSelect={() =>
              openExternalLink("https://github.com/jnaraujo/mercury-editor")
            }
          >
            <ExternalLink className="mr-2 h-4 w-4 shrink-0" />
            <span>Github</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Sistema">
          <CommandItem
            onSelect={() =>
              runCommand(
                () =>
                  setTheme((theme) => (theme === "light" ? "dark" : "light")),
                false,
              )
            }
          >
            <SunMoon className="mr-2 h-4 w-4 shrink-0" />
            <span>Mudar tema</span>
            <CommandShortcut>Ctrl + T</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              runCommand(async () =>
                appWindow.setFullscreen(!(await appWindow.isFullscreen())),
              )
            }
          >
            <Fullscreen className="mr-2 h-4 w-4 shrink-0" />
            <span>Fullscreen</span>
            <CommandShortcut>F11</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
