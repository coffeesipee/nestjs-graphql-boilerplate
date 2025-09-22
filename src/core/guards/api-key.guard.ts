import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ApiKeyService } from "../../app/application/services/api_key.service";

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(
        private readonly apiKeyService: ApiKeyService
    ) { }

    canActivate(
        context: ExecutionContext
    ) {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers["x-api-key"];

        return this.apiKeyService.validateApiKey(apiKey);
    }
}