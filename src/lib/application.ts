import { WebviewWindow } from "@tauri-apps/api/window";
import { filenameFromPath } from "./files";

const mainWebview = new WebviewWindow("main");

export async function setupAppWindow() {
  const appWindow = (await import("@tauri-apps/api/window")).appWindow;
  appWindow.show();
}

export async function sendStartupMessage() {
  mainWebview.emit("startup", "");
}

export async function onFilePathEventReceived() {
  return new Promise<{
    filename: string;
    path: string;
  }>((resolve) => {
    mainWebview.once("file-path", async (event) => {
      const path = (event.payload as any).path as string;

      if (!path) return;

      resolve({
        filename: filenameFromPath(path),
        path: path,
      });
    });
  });
}

export async function onStartupTimeEventReceived() {
  return new Promise<{
    time: number;
  }>((resolve) => {
    mainWebview.once("startup-time", async (event) => {
      const time = (event.payload as any).time as number;

      resolve({
        time: time || 0,
      });
    });
  });
}
