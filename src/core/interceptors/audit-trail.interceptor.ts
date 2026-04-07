import { Injectable, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { ExecutionContext, CallHandler } from "@nestjs/common";
import { Request } from "express";
import { AuditTrailService } from "../../app/audit-trail/services/audit-trail.service";
import { tap } from "rxjs";
import { GqlExecutionContext } from "@nestjs/graphql";
import { SetMetadata } from "@nestjs/common";
import { ReqMetadata } from "../../constants/req-metadata.constant";
import { Reflector } from "@nestjs/core";
import { AuditTrailConstant } from "../../app/audit-trail/audit-trail.constant";

@Injectable()
export class AuditTrailInterceptor implements NestInterceptor {
    constructor(private readonly auditTrailService: AuditTrailService, private readonly reflector: Reflector) { }

    async intercept(context: ExecutionContext, next: CallHandler) {

        return next.handle().pipe(
            tap({
                next: () => {
                    console.log('next')
                },
                error: () => {
                    console.log('error')
                },
                complete: async () => {
                    const req: Request = GqlExecutionContext.create(context).getContext().req
                    const metadata = this.reflector.get(AuditTrailConstant.AUDIT_TRAIL_ENTRY, context.getHandler())
                    console.log(metadata)

                    // Get audit trail entry
                    // const { resourceName, action, beforeEntity, afterEntity } = req.auditTrailEntry

                    // Get user info
                    // const { userId, fullname, email, roleId } = req.user as JWTPayload

                    // const { ip: userIp, headers: reqHeaders, body: reqBody, url: reqUrl, method: reqMethod } = req

                    // Create audit trail entry
                    // const auditTrailEntry = new AuditTrailEntryDto({
                    //     resourceName: '',
                    //     action: '',
                    //     beforeEntity: {},
                    //     afterEntity: {},
                    //     userinfo: {
                    //         userId,
                    //         fullname,
                    //         email,
                    //         roleId
                    //     },
                    //     userIp,
                    //     reqBody,
                    //     reqHeaders,
                    //     reqUrl,
                    //     reqMethod,
                    //     timestamp: new Date()
                    // })

                    // await this.auditTrailService.createAuditTrailEntry(auditTrailEntry)
                }
            })
        );
    }
}

export const UseAuditTrail = (resourceName: string) => (
    SetMetadata(ReqMetadata.AUDIT_TRAIL_RESOURCE_NAME, resourceName),
    UseInterceptors(AuditTrailInterceptor)
)
