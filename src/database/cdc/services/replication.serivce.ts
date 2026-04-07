import { Injectable, Logger, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LogicalReplicationService, Wal2JsonPlugin, PgoutputPlugin } from 'pg-logical-replication';

@Injectable()
export class ReplicationService implements OnApplicationBootstrap, OnApplicationShutdown {
    constructor(
        private readonly configService: ConfigService
    ) { }

    private service: LogicalReplicationService
    private plugin: PgoutputPlugin
    private readonly logger = new Logger('CDC')

    /**
     * Initialize the replication service when app starts using nestjs hook
     * @docs: https://docs.nestjs.com/fundamentals/lifecycle-events
     */
    onApplicationBootstrap() {
        this.service = new LogicalReplicationService({
            host: this.configService.get('cdc.host'),
            port: this.configService.get('cdc.port'),
            user: this.configService.get('cdc.user'),
            password: this.configService.get('cdc.password'),
            database: this.configService.get('cdc.database'),
        }, {
            acknowledge: {
                auto: this.configService.get('cdc.autoAcknowledge', true),
                timeoutSeconds: this.configService.get('cdc.acknowledgeTimeoutSeconds', 10),
            },
        })

        this.plugin = new PgoutputPlugin({
            protoVersion: 2,
            publicationNames: [this.configService.get('cdc.slotName')],
        })
        this.setupListener()

        this.logger.log('CDC Service started')
    }

    /**
     * Gracefully shutdown the replication service using nestjs hook
     * @docs: https://docs.nestjs.com/fundamentals/lifecycle-events
     */
    onApplicationShutdown() {
        this.service.stop()
    }

    setupListener() {
        this.service.subscribe(this.plugin, this.configService.get('cdc.slotName'))
        this.service.on('error', (error) => {
            this.logger.error(error)
        })

        this.service.on('data', (lsn, log) => {
            this.service.acknowledge(lsn)
            this.logger.verbose(`LSN: ${lsn}`)
            this.logger.log(`Received data: ${JSON.stringify(log)}`)
        })

        this.service.on('acknowledge', (lsn) => {
            this.logger.verbose(`ACK: ${lsn}`)
        })

        this.logger.log('CDC Service listening to changes')
    }
}