import { WebviewWindow } from "@tauri-apps/api/window";

export async function setupAppWindow() {
  const appWindow = (await import("@tauri-apps/api/window")).appWindow;
  appWindow.show();
}

export async function onStartupWithFilePath() {
  return new Promise<{
    filename: string;
    path: string;
  }>((resolve) => {
    const webview = new WebviewWindow("main");

    webview.emit("startup", "");

    webview.once("file_path", async (event) => {
      const path = (event.payload as any).message as string;
      if (!path) return;

      const filename = path.replace(/^.*[\\/]/, "");

      resolve({
        filename,
        path,
      });
    });
  });
}
