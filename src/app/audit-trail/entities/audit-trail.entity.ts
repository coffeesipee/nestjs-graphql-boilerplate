import { ABaseEntity } from "../../../core/classes/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class AuditTrail extends ABaseEntity {
    // Resource name
    @Column({ type: 'varchar', length: 255, name: 'resource_name' })
    resourceName: string

    // Action
    @Column({ type: 'varchar', length: 255, name: 'action' })
    action: string

    // Before entity
    @Column({ type: 'jsonb', name: 'before_entity' })
    beforeEntity: any

    // After entity
    @Column({ type: 'jsonb', name: 'after_entity' })
    afterEntity: any

    // User info (JSONB)
    @Column({ type: 'jsonb', name: 'userinfo' })
    userinfo: any

    // User ip
    @Column({ type: 'varchar', length: 255, name: 'user_ip' })
    userIp: string

    // Req headers
    @Column({ type: 'jsonb', name: 'req_headers' })
    reqHeaders: any

    // Req body
    @Column({ type: 'jsonb', name: 'req_body' })
    reqBody: any

    // Req url
    @Column({ type: 'varchar', length: 255, name: 'req_url' })
    reqUrl: string

    // Req method
    @Column({ type: 'varchar', length: 255, name: 'req_method' })
    reqMethod: string

    // Timestamp
    @Column({ type: 'timestamp', name: 'timestamp' })
    timestamp: Date
}