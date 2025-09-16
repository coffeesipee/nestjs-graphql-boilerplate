import { BaseStorageError } from "./base-storage.error";
import { ErrorCode } from "./code";

export class FailedPresignedUrlError extends BaseStorageError {
    constructor(error: any) {
        super(`Failed to get presigned url: ${error.message}`, ErrorCode.GET_PRESIGNED_URL_FAILED, error)
    }
}