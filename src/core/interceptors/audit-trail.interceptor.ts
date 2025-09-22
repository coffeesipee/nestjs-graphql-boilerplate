import { Injectable, NestInterceptor } from "@nestjs/common";
import { ExecutionContext, CallHandler } from "@nestjs/common";
import { Request } from "express";
import { AuditTrailEntryDto } from "src/app/audit-trail/dtos/audit-trail-entry.dto";
import { AuditTrailService } from "src/app/audit-trail/services/audit-trail.service";

@Injectable()
export class AuditTrailInterceptor implements NestInterceptor {
    constructor(private readonly auditTrailService: AuditTrailService) { }

    async intercept(context: ExecutionContext, next: CallHandler) {
        const req: Request = context.switchToHttp().getRequest();

        // Get audit trail entry
        const { resourceName, action, beforeEntity, afterEntity } = req.auditTrailEntry

        // Get user info
        const { userId, fullname, email, roleId } = req.user

        const { ip: userIp, headers: reqHeaders, body: reqBody, url: reqUrl, method: reqMethod } = req

        // Create audit trail entry
        const auditTrailEntry = new AuditTrailEntryDto({
            resourceName,
            action,
            beforeEntity,
            afterEntity,
            userinfo: {
                userId,
                fullname,
                email,
                roleId
            },
            userIp,
            reqBody,
            reqHeaders,
            reqUrl,
            reqMethod,
            timestamp: new Date()
        })

        await this.auditTrailService.create(auditTrailEntry)

        return next.handle();
    }
}