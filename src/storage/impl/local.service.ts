import { Injectable } from "@nestjs/common";
import { IStorageImpl } from "../contracts/impl.contract";
import { IStorageConfig } from "../contracts/storage-config.contract";
import { readdir, unlink, writeFile, readFile } from 'fs/promises'
import { FailedUploadError } from "../errors/failed-upload.error";
import { FailedPresignedUrlError } from "../errors/failed-presigned-url.error";

@Injectable()
export class LocalService implements IStorageImpl {
    constructor(private readonly config: IStorageConfig) { }

    public async putFile(path: string, file: Express.Multer.File) {
        const filePath = `${this.config.local.path}/${path}`

        try {
            await writeFile(filePath, file.buffer)

            return filePath
        } catch (error) {
            throw new FailedUploadError(`Failed to upload file to local storage: ${error}`)
        }
    }

    public async deleteFile(path: string) {
        const filePath = `${this.config.local.path}/${path}`

        try {
            await unlink(filePath)
        } catch (error) {
            throw new FailedUploadError(`Failed to delete file from local storage: ${error}`)
        }
    }

    public async getDirectories(prefix?: string): Promise<string[]> {
        const filePath = `${this.config.local.path}/${prefix}`
        const files = await readdir(filePath)
        return files
    }

    async getFiles(prefix?: string): Promise<string[]> {
        const filePath = `${this.config.local.path}/${prefix}`
        const files = await readdir(filePath)
        return files
    }

    async getPresignedUrl(key: string): Promise<string> {
        throw new FailedPresignedUrlError(`Presigned URL only available for non-local disk storage`)
    }
}