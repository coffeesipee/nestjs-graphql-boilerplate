export interface AuthConfig {
    jwt: {
        expiresIn: string
        refreshExpiresIn: string
        privateKey: Buffer
        publicKey: Buffer
    }
}