import { Injectable } from "@nestjs/common";
import { AuditTrail } from "../entities/audit-trail.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AuditTrailEntryDto } from "../dtos/audit-trail-entry.dto";
import { InjectQueue } from "@nestjs/bullmq";
import { AuditTrailConstant } from "../audit-trail.constant";
import { Queue } from "bullmq";

@Injectable()
export class AuditTrailService {
    constructor(
        @InjectRepository(AuditTrail)
        private readonly auditTrailRepository: Repository<AuditTrail>,
        @InjectQueue(AuditTrailConstant.INSERT_AUDIT_TRAIL_JOB)
        private readonly auditTrailJob: Queue<AuditTrail>
    ) { }

    public async create(auditTrailEntry: AuditTrailEntryDto) {
        return await this.auditTrailRepository.save(auditTrailEntry)
    }

    public async createAuditTrailEntry(auditTrailEntry: AuditTrailEntryDto) {
        this.auditTrailJob.add(AuditTrailConstant.INSERT_AUDIT_TRAIL_JOB, {
            ...auditTrailEntry,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    }
}