import { cn } from "@/lib/utils";
import { useConfigStore } from "@/stores/configStore";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

export default function ThemeToggle() {
  const theme = useConfigStore((state) => state.theme);
  const setTheme = useConfigStore((state) => state.setTheme);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setTheme(theme === "light" ? "dark" : "light");
      }}
      className="fixed bottom-4 left-4 rounded-full bg-zinc-100 p-2 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
    >
      <Moon
        className={cn(
          "absolute fill-zinc-600 text-zinc-600",
          "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform", // center
          "transition-all duration-300 ease-linear", // animate
          "hover:scale-105", // hover
          {
            "-rotate-90 opacity-0": isDark,
            "rotate-0 opacity-100": !isDark,
          },
        )}
      />
      <Sun
        className={cn(
          "absolute fill-yellow-500 text-yellow-500",
          "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform", // center
          "transition-all duration-300 ease-linear", // animate
          "hover:scale-105", // hover
          {
            "-rotate-90 opacity-100": isDark,
            "rotate-90 opacity-0": !isDark,
          },
        )}
      />
    </button>
  );
}
