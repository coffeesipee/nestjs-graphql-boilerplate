import { StorageType } from "../constants"

export interface IStorageConfig {
    type: StorageType
    s3?: {
        accessKeyId: string
        secretAccessKey: string
        region: string
        bucket: string
        endpoint: string
        expiresIn: number
        forcePathStyle?: boolean
    },
    local?: {
        path: string
    }
}