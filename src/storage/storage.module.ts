import { DynamicModule, Module, Provider } from "@nestjs/common";
import { StorageService } from "./storage.service";
import { IStorageConfig } from "./contracts/storage-config.contract";
import { STORAGE_CONFIG } from "./constants";

export interface StorageModuleAsyncOptions {
    imports?: any[];
    useFactory: (...args: any[]) => IStorageConfig | Promise<IStorageConfig>;
    inject?: any[];
}

@Module({})
export class StorageModule {
    static forRoot(config: IStorageConfig): DynamicModule {
        const configProvider: Provider = {
            provide: STORAGE_CONFIG,
            useValue: config,
        };

        return {
            module: StorageModule,
            providers: [configProvider, StorageService],
            exports: [StorageService],
        };
    }

    static forRootAsync(options: StorageModuleAsyncOptions): DynamicModule {
        const asyncProvider: Provider = {
            provide: STORAGE_CONFIG,
            useFactory: options.useFactory,
            inject: options.inject || [],
        };

        return {
            module: StorageModule,
            imports: options.imports || [],
            providers: [asyncProvider, StorageService],
            exports: [StorageService],
        };
    }
}
