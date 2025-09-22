import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomString } from "../../../core/utils/strings";
import { Application } from "../entities/application.entity";
import { Repository } from "typeorm";
import { Duration } from "../../../constants/duration.constant";

@Injectable()
export class ApiKeyService {
    constructor(
        @InjectRepository(Application) private readonly applicationRepository: Repository<Application>
    ) { }

    public async generateApiKey(length: number = 32): Promise<string> {
        const apiKey = randomString(length)

        return Promise.resolve(apiKey)
    }

    public async validateApiKey(apiKey: string): Promise<boolean> {
        const application = await this.applicationRepository
            .findOne({
                where: {
                    apiKey,
                    is_active: true
                },
                cache: Duration.ONE_HOUR // 1 hour
            })

        return Promise.resolve(!!application)
    }
}

