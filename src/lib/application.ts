import { WebviewWindow } from "@tauri-apps/api/window";
import { filenameFromPath } from "./files";

export async function setupAppWindow() {
  const appWindow = (await import("@tauri-apps/api/window")).appWindow;
  appWindow.show();
}

export async function onStartup() {
  return new Promise<{
    filename?: string;
    path?: string;
    rust_start_time: number;
  }>((resolve) => {
    const webview = new WebviewWindow("main");

    webview.emit("startup", "");

    webview.once("message", async (event) => {
      const message = event.payload as {
        file_path: string;
        rust_start_time: number;
      };

      if (!message) return;

      resolve({
        filename: filenameFromPath(message.file_path),
        path: message.file_path,
        rust_start_time: message.rust_start_time,
      });
    });
  });
}
