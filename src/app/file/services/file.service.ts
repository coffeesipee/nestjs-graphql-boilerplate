import { Injectable } from "@nestjs/common";
import { StorageService } from "src/storage/storage.service";
import { randomString } from "src/core/utils/strings";

@Injectable()
export class FileService {
    constructor(private readonly storageService: StorageService) { }

    public generateFilename(file: Express.Multer.File): string {
        const extension = file.originalname.split('.')[1]

        return `${randomString(10)}.${extension}`
    }

    async uploadFile(path: string, file: Express.Multer.File): Promise<{ uploaded: string }> {
        const uploaded = await this.storageService.uploadFile(path, file)

        return { uploaded }
    }
}