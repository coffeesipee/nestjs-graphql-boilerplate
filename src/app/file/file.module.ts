import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { StorageModule } from "../../storage/storage.module";
import { FileService } from "./services/file.service";
import { FileController } from "./controllers/file.controller";
import { StorageType } from "src/storage/constants";

@Module({
    imports: [
        StorageModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: configService.get('storage.type') as StorageType,
                s3: {
                    region: configService.get<string>('storage.s3.region'),
                    accessKeyId: configService.get<string>('storage.s3.accessKeyId'),
                    secretAccessKey: configService.get<string>('storage.s3.secretAccessKey'),
                    endpoint: configService.get<string>('storage.s3.endpoint'),
                    bucket: configService.get<string>('storage.s3.bucket'),
                    expiresIn: configService.get<number>('storage.s3.expiresIn'),
                    forcePathStyle: configService.get<boolean>('storage.s3.forcePathStyle')
                }
            })
        })
    ],
    controllers: [FileController],
    providers: [FileService],
    exports: [FileService]
})
export class FileModule { }