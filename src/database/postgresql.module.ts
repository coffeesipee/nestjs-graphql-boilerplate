import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE_NAME'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: configService.get<boolean>('DB_SYNC'),
        logging: ['query'],
        autoLoadEntities: true,
        cache: {
          type: 'ioredis',
          alwaysEnabled: false,
          ignoreErrors: true,
          options: {
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
            password: configService.get<string>('REDIS_PASSWORD'),
          },
        },
      }),
    }),
  ],
})
export class PostgreSQLDBModule { }
