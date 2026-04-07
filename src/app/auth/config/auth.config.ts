import { registerAs } from "@nestjs/config"
import { IsNotEmpty, IsString } from "class-validator"
import { validateConfig } from "../../../core/utils/validate-config"
import { AuthConfig } from "./auth-config.type"
import { join } from "path"
import { readFileSync } from "fs"

export class AuthConfigValidation {
    @IsString()
    @IsNotEmpty()
    JWT_EXPIRES_IN: string

    @IsString()
    @IsNotEmpty()
    JWT_REFRESH_EXPIRES_IN: string

    @IsString()
    @IsNotEmpty()
    JWT_PRIVATE_KEY: string

    @IsString()
    @IsNotEmpty()
    JWT_PUBLIC_KEY: string
}

export default registerAs<AuthConfig>('auth', () => {
    validateConfig(process.env, AuthConfigValidation)

    const privKey = readFileSync(join(process.cwd(), process.env.JWT_PRIVATE_KEY))
    const pubKey = readFileSync(join(process.cwd(), process.env.JWT_PUBLIC_KEY))
    return {
        jwt: {
            expiresIn: process.env.JWT_EXPIRES_IN,
            refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
            privateKey: privKey,
            publicKey: pubKey,
        }
    }
})
