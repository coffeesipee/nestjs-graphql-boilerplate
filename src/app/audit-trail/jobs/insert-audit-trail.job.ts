import { Processor, } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { AuditTrailService } from "../services/audit-trail.service";
import { AuditTrailConstant } from "../audit-trail.constant";
import { AuditTrail } from "../entities/audit-trail.entity";
import { Logger } from "@nestjs/common";
import { WorkerHost } from "@nestjs/bullmq";

@Processor(AuditTrailConstant.INSERT_AUDIT_TRAIL_JOB)
export class InsertAuditTrailJob extends WorkerHost {
    constructor(
        private readonly auditTrailService: AuditTrailService
    ) { super() }

    private logger = new Logger(InsertAuditTrailJob.name)

    async process(job: Job<AuditTrail>) {
        this.logger.log(`Inserting audit trail ${job.data.id}`)

        await this.auditTrailService.create(job.data);

        this.logger.log(`Inserted audit trail ${job.data.id}`)
    }
}
