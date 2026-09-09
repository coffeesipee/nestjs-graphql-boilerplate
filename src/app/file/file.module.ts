import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { StorageModule } from '../../storage/storage.module'
import { FileService } from './services/file.service'
import { FileController } from './controllers/file.controller'
import { StorageType } from 'src/storage/constants'

@Module({
  imports: [
    StorageModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('storage.type') as StorageType,
        local: {
          path: configService.get('storage.local.path'),
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
