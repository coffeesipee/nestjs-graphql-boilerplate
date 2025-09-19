import { ErrorCode } from "./code";
import { BaseStorageError } from "./base-storage.error";

export class NoFileError extends BaseStorageError {
    constructor() {
        super('No file found', ErrorCode.NO_FILE_FOUND)
    }
} 