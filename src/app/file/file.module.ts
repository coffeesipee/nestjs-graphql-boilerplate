import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { StorageModule } from "src/core/storage/storage.module";

@Module({
    imports: [
        StorageModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 's3',
                s3: {
                    region: configService.get<string>('S3_REGION'),
                    accessKeyId: configService.get<string>('S3_ACCESS_KEY_ID'),
                    secretAccessKey: configService.get<string>('S3_SECRET_ACCESS_KEY'),
                    endpoint: configService.get<string>('S3_ENDPOINT'),
                    bucket: configService.get<string>('S3_BUCKET'),
                    expiresIn: configService.get<number>('S3_EXPIRES_IN'),
                }
            })
        })
    ],
    providers: [],
    exports: []
})
export class FileModule { }