import { registerAs } from "@nestjs/config";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { validateConfig } from "src/core/utils/validate-config";
import { DatabaseConfig } from "./database-config.type";

export class DatabaseConfigValidation {
    @IsString()
    @IsNotEmpty()
    DB_HOST: string

    @IsInt()
    @IsNotEmpty()
    DB_PORT: number

    @IsString()
    @IsNotEmpty()
    DB_USERNAME: string

    @IsString()
    @IsNotEmpty()
    DB_PASSWORD: string

    @IsString()
    @IsNotEmpty()
    DB_DATABASE_NAME: string

    @IsBoolean()
    @IsOptional()
    DB_SYNC: boolean

    @IsInt()
    @IsOptional()
    DB_POOL_SIZE: number
}

export default registerAs<DatabaseConfig>('database', () => {
    validateConfig(process.env, DatabaseConfigValidation)

    return {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        databaseName: process.env.DB_DATABASE_NAME,
        sync: process.env.DB_SYNC === 'true',
        poolSize: Number(process.env.DB_POOL_SIZE),
    }
})