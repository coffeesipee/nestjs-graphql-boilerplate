export interface IStorageConfig {
    type: 's3' | 'local'
    s3?: {
        accessKeyId: string
        secretAccessKey: string
        region: string
        bucket: string
        endpoint: string
        expiresIn: number
    },
    local?: {
        path: string
    }
}