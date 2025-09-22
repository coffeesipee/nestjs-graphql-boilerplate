import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Application } from "../entities/application.entity";
import { Repository } from "typeorm";
import { PaginationParams, PaginationResponse } from "../../../core/classes/pagination.class";
import { ListApplication } from "../dtos/list-application.dto";
import { ApiKeyService } from "./api_key.service";
import { toSlug } from "src/core/utils/strings";
import { normalizePageParams } from "src/core/utils/pagination";

@Injectable()
export class ApplicationService {
    constructor(
        @InjectRepository(Application)
        private readonly applicationRepository: Repository<Application>,
        private readonly apiKeyService: ApiKeyService
    ) { }

    async findAll(params: PaginationParams): Promise<ListApplication> {
        const { page, limit, skip } = normalizePageParams(params);

        const [data, total] = await this.applicationRepository.createQueryBuilder('application')
            .orderBy(params.orderBy, params.order)
            .skip(skip)
            .take(limit)
            .getManyAndCount();

        return PaginationResponse.constructResponse<Application, ListApplication>(
            total,
            { ...params, page, limit },
            data
        )
    }

    async findOne(id: string): Promise<Application> {
        return this.applicationRepository.findOneBy({ id })
    }

    async create(data: Application): Promise<Application> {
        const application = this.applicationRepository.create(data)
        application.apiKey = await this.apiKeyService.generateApiKey()
        application.code = toSlug(data.name)

        return this.applicationRepository.save(application)
    }

    async update(id: string, data: Application): Promise<boolean> {
        const result = await this.applicationRepository.update(id, data)

        return result.affected > 0
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.applicationRepository.softDelete(id)

        return result.affected > 0
    }
}

