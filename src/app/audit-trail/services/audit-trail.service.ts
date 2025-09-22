import { Injectable } from "@nestjs/common";
import { AuditTrail } from "../entities/audit-trail.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AuditTrailEntryDto } from "../dtos/audit-trail-entry.dto";
import { InjectQueue } from "@nestjs/bullmq";
import { AuditTrailConstant } from "../audit-trail.constant";
import { InsertAuditTrailJob } from "../jobs/insert-audit-trail.job";

@Injectable()
export class AuditTrailService {
    constructor(
        @InjectRepository(AuditTrail)
        private readonly auditTrailRepository: Repository<AuditTrail>,
        @InjectQueue(AuditTrailConstant.INSERT_AUDIT_TRAIL_JOB)
        private readonly auditTrailJob: InsertAuditTrailJob
    ) { }

    public async create(auditTrailEntry: AuditTrailEntryDto) {
        return await this.auditTrailRepository.save(auditTrailEntry)
    }

    public async createAuditTrailEntry() {

    }
}