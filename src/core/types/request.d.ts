import { AuditTrailEntryDto } from "../../app/audit-trail/dtos/audit-trail-entry.dto";
import { JWTPayload } from "../../app/auth/dtos/jwt-payload.dto";

declare global {
    namespace Express {
        interface Request {
            auditTrailEntry: AuditTrailEntryDto
            user: JWTPayload
        }
    }
}