export class CDCConfig {
    host: string
    port: number
    user: string
    password: string
    database: string
    slotName: string
    autoAcknowledge: boolean
    acknowledgeTimeoutSeconds: number
}