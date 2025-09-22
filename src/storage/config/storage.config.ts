import { registerAs } from "@nestjs/config";
import { validateConfig } from "src/core/utils/validate-config";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";
import { StorageType } from "../constants";
import { StorageConfig } from "./storage-config.type";
import { Transform } from "class-transformer";

export class StorageConfigValidation {
    @IsString()
    @IsNotEmpty()
    STORAGE_TYPE: string

    @ValidateIf((config) => config.STORAGE_TYPE === StorageType.S3)
    @IsString()
    @IsNotEmpty()
    S3_REGION: string

    @ValidateIf((config) => config.STORAGE_TYPE === StorageType.S3)
    @IsString()
    @IsNotEmpty()
    S3_ACCESS_KEY: string

    @ValidateIf((config) => config.STORAGE_TYPE === StorageType.S3)
    @IsString()
    @IsNotEmpty()
    S3_SECRET_ACCESS_KEY: string

    @ValidateIf((config) => config.STORAGE_TYPE === StorageType.S3)
    @IsString()
    @IsNotEmpty()
    S3_ENDPOINT: string

    @ValidateIf((config) => config.STORAGE_TYPE === StorageType.S3)
    @IsString()
    @IsNotEmpty()
    S3_BUCKET: string

    @ValidateIf((config) => config.STORAGE_TYPE === StorageType.S3)
    @IsNumber()
    @IsNotEmpty()
    S3_EXPIRES_IN: number

    @ValidateIf((config) => config.STORAGE_TYPE === StorageType.S3)
    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => value === 'true')
    S3_FORCE_PATH_STYLE: boolean

    @ValidateIf((config) => config.STORAGE_TYPE === StorageType.LOCAL)
    @IsString()
    @IsNotEmpty()
    LOCAL_PATH: string
}

export default registerAs<StorageConfig>('storage', () => {
    validateConfig(process.env, StorageConfigValidation)

    return {
        type: process.env.STORAGE_TYPE as StorageType,
        s3: {
            region: process.env.S3_REGION,
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            endpoint: process.env.S3_ENDPOINT,
            bucket: process.env.S3_BUCKET,
            expiresIn: Number(process.env.S3_EXPIRES_IN),
            forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
        },
        local: {
            path: process.env.LOCAL_PATH,
        }
    }
})