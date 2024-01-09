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
    action: async () => {
      const { appWindow } = await import("@tauri-apps/api/window");
      appWindow.isFullscreen().then((isFullscreen) => {
        appWindow.setFullscreen(!isFullscreen);
      });
    },
  },
  {
    isCtrl: true,
    key: "K",
    action: async () => {
      const { useCommandStore } = await import("@/stores/commandStore");
      useCommandStore.getState().setOpen((open) => !open);
    },
  },
  {
    isCtrl: true,
    key: "T",
    action: async () => {
      const { useConfigStore } = await import("@/stores/configStore");
      useConfigStore
        .getState()
        .setTheme((theme) => (theme === "dark" ? "light" : "dark"));
    },
  },
  {
    isCtrl: true,
    key: "N",
    action: async () => {
      const { useCreateNewNoteDialogStore } = await import(
        "@/stores/createNewNoteDialogStore"
      );
      useCreateNewNoteDialogStore.getState().setOpen(true);
    },
  },
];
