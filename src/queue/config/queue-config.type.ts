export interface QueueConfig {
    removeOnComplete: boolean;
    removeOnFail: boolean
    attempts: number
    delay: number
}