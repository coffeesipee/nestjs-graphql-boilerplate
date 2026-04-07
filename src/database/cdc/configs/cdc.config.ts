import { registerAs } from "@nestjs/config";
import { CDCConfig } from "./cdc-config.type";
import { validateConfig } from "src/core/utils/validate-config";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CDCConfigValidation {
    @IsNotEmpty()
    @IsString()
    DB_HOST: string;

    @IsNotEmpty()
    @IsNumber()
    DB_PORT: number;

    @IsNotEmpty()
    @IsString()
    DB_USERNAME: string;

    @IsNotEmpty()
    @IsString()
    DB_PASSWORD: string;

    @IsNotEmpty()
    @IsString()
    DB_DATABASE_NAME: string;

    @IsNotEmpty()
    @IsString()
    CDC_SLOT_NAME: string;

    @IsNotEmpty()
    @IsBoolean()
    CDC_AUTO_ACK: boolean;

    @IsNotEmpty()
    @IsNumber()
    CDC_ACK_TIMEOUT_SECS: number;
}

export default registerAs<CDCConfig>('cdc', () => {
    validateConfig(process.env, CDCConfigValidation)

    return {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_NAME,
        slotName: process.env.CDC_SLOT_NAME,
        autoAcknowledge: process.env.CDC_AUTO_ACK == 'true',
        acknowledgeTimeoutSeconds: Number(process.env.CDC_ACK_TIMEOUT_SECS) ?? 10,
    }
})
