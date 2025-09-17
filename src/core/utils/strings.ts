import { randomBytes } from "crypto"

export const toSlug = (str: string) => {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-{2,}/g, '-').replace(/^-+|-+$/g, '')
}

export const randomString = (length: number) => {
    return randomBytes(length).toString('hex')
}
