import { cn } from "@/lib/utils";
import { useCommandStore } from "@/stores/commandStore";
import CommandShortcut from "./command-shortcut";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

export default function SettingsOpen({ className, ...rest }: Props) {
  const setOpen = useCommandStore((state) => state.setOpen);

  return (
    <button
      onClick={() => setOpen((open) => !open)}
      aria-label="Abrir menu de configurações"
      className={cn(
        "flex items-center gap-0.5 rounded-md px-2 py-0.5 transition-colors duration-200 hover:bg-zinc-300 dark:hover:bg-zinc-900",
        className,
      )}
      {...rest}
    >
      <span className="mr-0.5 text-xs text-zinc-800 dark:text-zinc-400">
        Menu
      </span>
      <CommandShortcut className="w-5 justify-center border-none bg-zinc-700 text-zinc-200">
        ⌘
      </CommandShortcut>
      <CommandShortcut className="w-5 justify-center border-none bg-zinc-700 text-zinc-200">
        K
      </CommandShortcut>
    </button>
  );
}
