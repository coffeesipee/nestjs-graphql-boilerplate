import { Injectable } from "@nestjs/common";
import { randomBytes } from 'crypto'

@Injectable()
export class ApiKeyService {
    public async generateApiKey(length: number = 32): Promise<string> {
        const apiKey = randomBytes(length).toString('hex')

        return Promise.resolve(apiKey)
    }
}

