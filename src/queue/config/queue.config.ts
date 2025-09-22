import { registerAs } from "@nestjs/config";
import { QueueConfig } from "./queue-config.type";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { validateConfig } from "src/core/utils/validate-config";

export class QueueConfigValidation {
    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => value === 'true')
    QUEUE_REMOVE_ON_COMPLETE: boolean;

    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => value === 'true')
    QUEUE_REMOVE_ON_FAIL: boolean;

    @IsNumber()
    @IsNotEmpty()
    QUEUE_ATTEMPTS: number;

    @IsNumber()
    @IsNotEmpty()
    QUEUE_DELAY: number;
}

export default registerAs<QueueConfig>('queue', () => {
    validateConfig(process.env, QueueConfigValidation)

    return {
        removeOnComplete: process.env.QUEUE_REMOVE_ON_COMPLETE === 'true',
        removeOnFail: process.env.QUEUE_REMOVE_ON_FAIL === 'true',
        attempts: Number(process.env.QUEUE_ATTEMPTS),
        delay: Number(process.env.QUEUE_DELAY)
    }
})