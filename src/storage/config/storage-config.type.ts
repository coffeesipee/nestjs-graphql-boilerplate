import { StorageType } from "src/storage/constants";

export interface StorageConfig {
    type: StorageType
    s3: {
        region: string
        accessKeyId: string
        secretAccessKey: string
        endpoint: string
        bucket: string
        expiresIn: number
        forcePathStyle: boolean
    }
    local: {
        path: string
    }
}