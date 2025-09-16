import { ErrorCode } from "./code";
import { BaseStorageError } from "./base-storage.error";

export class FailedListFilesError extends BaseStorageError {
    constructor(error: any) {
        super(`Failed to list files: ${error.message}`, ErrorCode.LIST_FILES_FAILED, error)
    }
}