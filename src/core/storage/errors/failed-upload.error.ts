import { BaseStorageError } from "./base-storage.error";
import { ErrorCode } from "./code";

export class FailedUploadError extends BaseStorageError {
    constructor(error: any) {
        super(`Failed to upload file: ${error.message}`, ErrorCode.UPLOAD_FAILED, error)
    }
}