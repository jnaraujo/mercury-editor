import { SHORTCUTS } from "@/constants/shortcuts";
import { disableMenu } from "@/lib/browser";
import { useEffect } from "react";

export default function Shortcuts() {
  useEffect(() => {
    disableMenu();

    const handleKeyDown = (e: KeyboardEvent) => {
      const hasCtrl = e.ctrlKey || e.metaKey;
      const hasShift = e.shiftKey;
      const hasAlt = e.altKey;

      const shortcut = SHORTCUTS.find(
        (s) => s.key?.toLocaleLowerCase() === e.key.toLocaleLowerCase(),
      );

      if (shortcut) {
        if (
          (shortcut.isCtrl && !hasCtrl) ||
          (shortcut.isShift && !hasShift) ||
          (shortcut.isAlt && !hasAlt)
        ) {
          return;
        }

        e.preventDefault();
        shortcut.action();
      }
    };

    function disableCtrlRightClick(e: MouseEvent) {
      if (e.ctrlKey && e.button === 0) {
        e.preventDefault();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", disableCtrlRightClick);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", disableCtrlRightClick);
    };
  }, []);
  return null;
}
