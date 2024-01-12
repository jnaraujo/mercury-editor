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

export async function removeNote(path: string) {
  useNotesStore.getState().removeNote(path);
}

export async function deleteFileAndNote(path: string) {
  removeNote(path);
  await removeFile(path);
}
