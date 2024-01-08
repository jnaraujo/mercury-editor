import { useConfigStore } from "@/stores/configStore";
import { useEffect } from "react";

export default function ThemeToggle() {
  const theme = useConfigStore((state) => state.theme);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  return null;
}
