import { SHORTCUTS } from "@/constants/shortcuts";
import { useEffect } from "react";

export default function Shortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const hasCtrl = e.ctrlKey || e.metaKey;
      const hasShift = e.shiftKey;
      const hasAlt = e.altKey;

      const shortcut = SHORTCUTS.find(
        (s) => s.key?.toLocaleLowerCase() === e.key.toLocaleLowerCase(),
      );

      if (shortcut) {
        e.preventDefault();

        if (
          (shortcut.isCtrl && !hasCtrl) ||
          (shortcut.isShift && !hasShift) ||
          (shortcut.isAlt && !hasAlt)
        ) {
          return;
        }
        shortcut.action();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return null;
}