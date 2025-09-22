import { AuditTrail } from "../entities/audit-trail.entity";

export class AuditTrailEntryDto extends AuditTrail {
    constructor(obj: AuditTrailEntryDto) {
        super()
        Object.assign(this, obj)
    }
}