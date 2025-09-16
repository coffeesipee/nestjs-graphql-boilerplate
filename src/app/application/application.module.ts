import { Module } from "@nestjs/common";
import { ApplicationService } from "./services/application.service";
import { ApiKeyService } from "./services/api_key.service";
import { ApplicationResolver } from "./resolvers/application.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Application } from "./entities/application.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Application])
    ],
    providers: [ApplicationService, ApiKeyService, ApplicationResolver],
    exports: [ApplicationService]
})
export class ApplicationModule { }