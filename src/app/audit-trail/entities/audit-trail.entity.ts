import { ABaseEntity } from "../../../core/classes/base.entity";
import { Entity } from "typeorm";

@Entity()
export class AuditTrail extends ABaseEntity {
    // Resource name
    resourceName: string

    // Action
    action: string

    // Before entity
    beforeEntity: any

    // After entity
    afterEntity: any

    // User info (JSONB)
    userinfo: any

    // User ip
    userIp: string

    // Req headers
    reqHeaders: any

    // Req body
    reqBody: any

    // Req url
    reqUrl: string

    // Req method
    reqMethod: string

    // Timestamp
    timestamp: Date
}