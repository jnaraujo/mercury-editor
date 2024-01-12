import { setFullscreen } from "@/lib/application";
import { useCommandStore } from "@/stores/commandStore";
import { useConfigStore } from "@/stores/configStore";
import { useCreateNewNoteDialogStore } from "@/stores/createNewNoteDialogStore";
import { appWindow } from "@tauri-apps/api/window";

interface Shortcut {
  isCtrl?: boolean;
  isAlt?: boolean;
  isShift?: boolean;

  key?: string;
  action: () => void;
}

export const SHORTCUTS: Shortcut[] = [
  {
    key: "F11",
    action: () => {
      appWindow.isFullscreen().then((isFullscreen) => {
        setFullscreen(!isFullscreen);
      });
    },
  },
  {
    isCtrl: true,
    key: "K",
    action: () => {
      useCommandStore.getState().setOpen((open) => !open);
    },
  },
  {
    isCtrl: true,
    key: "T",
    action: () => {
      useConfigStore
        .getState()
        .setTheme((theme) => (theme === "dark" ? "light" : "dark"));
    },
  },
  {
    isCtrl: true,
    key: "N",
    action: () => {
      useCreateNewNoteDialogStore.getState().setOpen(true);
    },
  },
];
