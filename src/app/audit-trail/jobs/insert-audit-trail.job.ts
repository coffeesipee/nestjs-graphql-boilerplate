import { Processor, } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { AuditTrailService } from "../services/audit-trail.service";
import { AuditTrailConstant } from "../audit-trail.constant";

@Processor(AuditTrailConstant.INSERT_AUDIT_TRAIL_JOB)
export class InsertAuditTrailJob {
    constructor(
        private readonly auditTrailService: AuditTrailService
    ) { }

    async execute(job: Job) {
        await this.auditTrailService.create(job.data);
    }
}
