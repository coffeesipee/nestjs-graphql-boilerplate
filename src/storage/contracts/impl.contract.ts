export interface IStorageImpl {
    putFile(path: string, file: Express.Multer.File): Promise<string>;
    deleteFile(path: string): Promise<void>;
    getDirectories(prefix?: string): Promise<string[]>;
    getFiles(prefix?: string): Promise<string[]>;
    getPresignedUrl(path: string): Promise<string>;
}
