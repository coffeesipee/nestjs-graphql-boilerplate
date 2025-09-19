import { registerAs } from "@nestjs/config";
import { IsString, IsNotEmpty, IsInt } from "class-validator";
import { validateConfig } from "src/core/utils/validate-config";

export class RedisConfigValidation {
    @IsString()
    @IsNotEmpty()
    REDIS_HOST: string

    @IsInt()
    @IsNotEmpty()
    REDIS_PORT: number

    @IsString()
    @IsNotEmpty()
    REDIS_PASSWORD: string
}

export default registerAs('redis', () => {
    validateConfig(process.env, RedisConfigValidation)

    return {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
    }
})
