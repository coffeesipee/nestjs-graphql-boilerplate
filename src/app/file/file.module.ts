import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { StorageModule } from "../../core/storage/storage.module";
import { FileService } from "./services/file.service";
import { FileController } from "./controllers/file.controller";
import { StorageType } from "src/core/storage/constants";

@Module({
    imports: [
        StorageModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: StorageType.S3,
                s3: {
                    region: configService.get<string>('S3_REGION'),
                    accessKeyId: configService.get<string>('S3_ACCESS_KEY'),
                    secretAccessKey: configService.get<string>('S3_SECRET_ACCESS_KEY'),
                    endpoint: configService.get<string>('S3_ENDPOINT'),
                    bucket: configService.get<string>('S3_BUCKET'),
                    expiresIn: configService.get<number>('S3_EXPIRES_IN'),
                    forcePathStyle: true
                }
            })
        })
    ],
    controllers: [FileController],
    providers: [FileService],
    exports: [FileService]
})
export class FileModule { }