export interface DatabaseConfig {
    host: string
    port: number
    username: string
    password: string
    databaseName: string
    sync: boolean
    poolSize: number
}