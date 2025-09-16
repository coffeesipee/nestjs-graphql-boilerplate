import { BaseStorageError } from "./base-storage.error";
import { ErrorCode } from "./code";

export class FailedDeleteError extends BaseStorageError {
    constructor(error: any) {
        super(`Failed to delete file: ${error.message}`, ErrorCode.DELETE_FAILED, error)
    }
}