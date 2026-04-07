import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuditTrail } from "./entities/audit-trail.entity";
import { AuditTrailService } from "./services/audit-trail.service";
import { AuditTrailConstant } from "./audit-trail.constant";
import { BullModule } from "@nestjs/bullmq";
import { InsertAuditTrailJob } from "./jobs/insert-audit-trail.job";

@Module({
    imports: [TypeOrmModule.forFeature([AuditTrail]), BullModule.registerQueue({
        name: AuditTrailConstant.INSERT_AUDIT_TRAIL_JOB,
    })],
    providers: [AuditTrailService, InsertAuditTrailJob],
    exports: [AuditTrailService]
})
export class AuditTrailModule { }