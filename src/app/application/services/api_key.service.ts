import { Injectable } from "@nestjs/common";
import { randomBytes } from 'crypto'
import { randomString } from "src/core/utils/strings";

@Injectable()
export class ApiKeyService {
    public async generateApiKey(length: number = 32): Promise<string> {
        const apiKey = randomString(length)

        return Promise.resolve(apiKey)
    }
}

