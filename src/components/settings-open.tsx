import { useCommandStore } from "@/stores/commandStore";
import { Settings } from "lucide-react";

export default function SettingsOpen() {
  const setOpen = useCommandStore((state) => state.setOpen);

  return (
    <button
      onClick={() => setOpen((open) => !open)}
      aria-label="Abrir menu de configurações"
    >
      <Settings className="text-zinc-500 dark:text-zinc-400 hover:animate-rotate" />
    </button>
  );
}
