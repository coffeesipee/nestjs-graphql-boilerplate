import { Module } from "@nestjs/common";
import { ReplicationService } from "./services/replication.serivce";

@Module({
    imports: [],
    providers: [ReplicationService],
    exports: [ReplicationService]
})
export class CdcModule { }