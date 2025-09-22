import { ExpressAdapter } from "@bull-board/express";
import { BullBoardModule } from "@bull-board/nestjs";
import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        BullModule.forRootAsync({
            useFactory: (config: ConfigService) => ({
                connection: {
                    host: config.get('redis.host'),
                    port: config.get('redis.port'),
                    password: config.get('redis.password'),
                },
                defaultJobOptions: {
                    attempts: config.get('queue.attempts'),
                    removeOnComplete: config.get('queue.removeOnComplete'),
                    removeOnFail: config.get('queue.removeOnFail'),
                    delay: config.get('queue.delay')
                }
            }),
            inject: [ConfigService]
        }),

        BullBoardModule.forRoot({
            route: '/q',
            adapter: ExpressAdapter
        })
    ],
})
export class QueueModule { }