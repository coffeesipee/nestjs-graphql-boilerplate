import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get<ConfigService>(ConfigService)

  const port = configService.get<number>('APP_PORT')
  const logger = new Logger('Server')

  await app.listen(port ?? 3000);
  logger.log(`${configService.get<string>('APP_NAME')} is running on: http://localhost:${port}`)
}
bootstrap();
