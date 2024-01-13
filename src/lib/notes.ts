import { Note } from "@/@types/note";
import { NoteNotFoundError } from "@/errors/note-not-found";
import { useNotesStore } from "@/stores/notesStore";
import { removeFile, writeTextFile } from "@tauri-apps/api/fs";

export function findNoteByPath(path: string) {
  return useNotesStore.getState().findNoteByPath(path);
}

export function addNote(note: Note) {
  return useNotesStore.getState().addNote(note);
}

export function useNotes() {
  return useNotesStore((state) => state.notes);
}

export function getNotes() {
  return useNotesStore.getState().notes;
}

export function addNotesIfNotExists(notes: Note[]) {
  return useNotesStore.getState().addNotesIfNotExists(notes);
}

export async function updateNoteFile(path: string, content: string) {
  const note = findNoteByPath(path);
  if (!note) {
    throw new NoteNotFoundError();
  }

  return await writeTextFile(path, content);
}

export function updateNote(path: string, note: Note) {
  return useNotesStore.getState().updateNote(path, note);
}

export async function createNote(name: string, content: string = "") {
  const documentDirPath = await documentDir();
  const fullPath = `${documentDirPath}\\notes\\${name}`;

  if ((await exists(fullPath)) || findNoteByPath(fullPath)) {
    throw new NoteAlreadyExistsError();
  }

  await writeTextFile(fullPath, content);

  addNote({
    id: randomUUID(),
    path: fullPath,
    title: name,
    description: content.slice(0, 100),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isArchived: false,
    isPinned: false,
  });

  return fullPath;
}

export function archiveNote(path: string) {
  const note = findNoteByPath(path);
  if (!note) {
    throw new NoteNotFoundError();
  }

  updateNote(path, {
    ...note,
    isArchived: true,
    updatedAt: Date.now(),
  });
}

export function unarchiveNote(path: string) {
  const note = findNoteByPath(path);
  if (!note) {
    throw new NoteNotFoundError();
  }

  updateNote(path, {
    ...note,
    isArchived: false,
    updatedAt: Date.now(),
  });
}

export async function deleteNoteFile(path: string) {
  return await removeFile(path);
}