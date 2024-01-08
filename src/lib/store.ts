import { Store } from "tauri-plugin-store-api";

export function createStore(path: string) {
  const store = new Store(path);

  return {
    async set(key: string, value: any) {
      await store.set(key, value);
      await store.save();
    },

    async get(key: string) {
      return await store.get(key);
    },

    async delete(key: string) {
      await store.delete(key);
      await store.save();
    },
  };
}
