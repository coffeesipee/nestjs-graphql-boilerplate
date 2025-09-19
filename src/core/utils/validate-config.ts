import { ClassConstructor, plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

export const validateConfig = <T extends object>(config: Record<string, unknown>, varClass: ClassConstructor<T>) => {
    const validatedConfig = plainToInstance(varClass, config, {
        enableImplicitConversion: true,
    })

    const err = validateSync(validatedConfig)

    if (err.length > 0) {
        throw new Error(err.toString())
    }

    return validatedConfig
}