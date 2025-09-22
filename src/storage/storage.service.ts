import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { IStorageConfig } from "./contracts/storage-config.contract";
import { IStorageImpl } from "./contracts/impl.contract";
import { S3Service } from "./impl/s3.service";
import { STORAGE_CONFIG, StorageType } from "./constants";
import { LocalService } from "./impl/local.service";

@Injectable()
export class StorageService implements OnModuleInit {
    constructor(@Inject(STORAGE_CONFIG) private readonly config: IStorageConfig) {

    }

    private impl: IStorageImpl
    initImpl() {
        const handler = {
            [StorageType.S3]: (() => {
                if (!this.config.s3) {
                    throw new Error('S3 config is missing')
                }

                return new S3Service(this.config)
            })(),
            [StorageType.LOCAL]: (() => {
                if (!this.config.local) {
                    throw new Error('Local config is missing')
                }

                return new LocalService(this.config)
            })()
        }

        if (!handler[this.config.type]) {
            throw new Error(`Invalid storage type: ${this.config.type}`)
        }

        this.impl = handler[this.config.type]
    }

    onModuleInit() {
        this.initImpl()
    }

    async uploadFile(path: string, file: Express.Multer.File): Promise<string> {
        return this.impl.putFile(path, file)
    }

    async deleteFile(path: string): Promise<void> {
        return this.impl.deleteFile(path)
    }

    async getPresignedUrl(path: string): Promise<string> {
        return this.impl.getPresignedUrl(path)
    }

    async getFiles(prefix?: string): Promise<string[]> {
        return this.impl.getFiles(prefix)
    }

    async getDirectories(prefix?: string): Promise<string[]> {
        return this.impl.getDirectories(prefix)
    }
}

