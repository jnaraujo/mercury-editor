import { Store } from "tauri-plugin-store-api";
import { type StateStorage } from "zustand/middleware";

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

export function createZustandStore(path: string) {
  const store = createStore(path);
  const storage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
      const value = (await store.get(name)) as string | null;
      return value;
    },
    setItem: async (name: string, value: string): Promise<void> => {
      await store.set(name, value);
    },
    removeItem: async (name: string): Promise<void> => {
      await store.delete(name);
    },
  };

  return storage;
}
