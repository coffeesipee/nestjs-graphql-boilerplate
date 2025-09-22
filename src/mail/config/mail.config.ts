import { registerAs } from "@nestjs/config";
import { IsNotEmpty, IsString } from "class-validator";
import { MailConfig } from "./mail-config.type";
import { validateConfig } from "src/core/utils/validate-config";

export class MailConfigValidation {
    @IsString()
    @IsNotEmpty()
    MAIL_TRANSPORT: string

    @IsString()
    @IsNotEmpty()
    MAIL_FROM: string

    @IsString()
    @IsNotEmpty()
    MAIL_TEMPLATE_DIR: string
}

export default registerAs<MailConfig>('mail', () => {
    validateConfig(process.env, MailConfigValidation)

    return {
        transport: process.env.MAIL_TRANSPORT,
        from: process.env.MAIL_FROM,
        templateDir: process.env.MAIL_TEMPLATE_DIR,
    }
})

