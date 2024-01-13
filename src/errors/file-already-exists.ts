export class FileAlreadyExistsError extends Error {
  constructor() {
    super("File already exists");
  }
}
