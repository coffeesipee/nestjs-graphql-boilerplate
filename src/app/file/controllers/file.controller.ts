import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileService } from "../services/file.service";
import { FileUploadDto } from "../dtos/file-upload.dto";
import { FileInterceptor } from '@nestjs/platform-express'
import { join } from "path";

@Controller('/v1/file')
export class FileController {
    constructor(private readonly fileService: FileService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: FileUploadDto) {
        return this.fileService.uploadFile(`${join(body.prefix, this.fileService.generateFilename(file))}`, file)
    }
}

