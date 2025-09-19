import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.databaseName'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: configService.get<boolean>('database.sync'),
        logging: ['query'],
        autoLoadEntities: true,
        poolSize: configService.get<number>('database.poolSize') ?? 15,
        cache: {
          type: 'ioredis',
          alwaysEnabled: false,
          ignoreErrors: true,
          options: {
            host: configService.get('redis.host'),
            port: configService.get('redis.port'),
            password: configService.get('redis.password'),
          },
        },
      }),
    }),
  ],
})
export class PostgreSQLDBModule { }
