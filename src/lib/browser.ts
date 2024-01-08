export function disableMenu() {
  if (window.location.hostname !== "tauri.localhost") {
    return;
  }
  document.addEventListener(
    "contextmenu",
    (e) => {
      e.preventDefault();
      return false;
    },
    { capture: true },
  );
}
