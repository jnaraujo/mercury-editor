import { useCommandStore } from "@/stores/commandStore";
import { Settings } from "lucide-react";

export default function SettingsOpen() {
  const setOpen = useCommandStore((state) => state.setOpen);

  return (
    <button
      onClick={() => setOpen((open) => !open)}
      aria-label="Abrir menu de configurações"
    >
      <Settings
        className="text-zinc-500 hover:animate-rotate dark:text-zinc-400"
        size={22}
      />
    </button>
  );
}
