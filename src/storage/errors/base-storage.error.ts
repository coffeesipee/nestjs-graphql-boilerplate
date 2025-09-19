import { ErrorCode } from './code'
export class BaseStorageError extends Error {
    constructor(message: string, code: ErrorCode, providerError?: any) {
        super(message);
        this._code = code
        this._providerError = providerError
    }

    private _code: ErrorCode;
    private _providerError: any

    get code(): ErrorCode {
        return this._code;
    }

    get providerError(): any {
        return this._providerError;
    }
}