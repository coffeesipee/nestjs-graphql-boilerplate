import { generateKeyPairSync } from "crypto"
import { writeFileSync } from "fs"
import { join } from "path"

export const generateKey = () => {
    const keyPair = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
    })

    writeFileSync(join(process.cwd(), 'private.key'), keyPair.privateKey)
    writeFileSync(join(process.cwd(), 'public.key'), keyPair.publicKey)

    return
}

generateKey()
