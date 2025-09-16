import { Injectable } from "@nestjs/common";
import { IStorageImpl } from "../contracts/impl.contract";
import { IStorageConfig } from "../contracts/storage-config.contract";
import { FailedUploadError } from "../errors/failed-upload.error";
import { FailedDeleteError } from "../errors/failed-delete.error";
import { DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { FailedPresignedUrlError } from "../errors/failed-presigned-url.error";
import { FailedListFilesError } from "../errors/failed-list-files.error";
import { NoFileError } from "../errors/no-file.error";

@Injectable()
export class S3Service implements IStorageImpl {
    constructor(private readonly config: IStorageConfig) {
        /**
         * Initialize S3 client, this is done here to avoid
         * the need to initialize it in each method
         * no client will be accessed outside this class
         */
        this.s3Client = new S3Client({
            region: this.config.s3.region,
            credentials: {
                accessKeyId: this.config.s3.accessKeyId,
                secretAccessKey: this.config.s3.secretAccessKey,
            },
            endpoint: this.config.s3.endpoint,
        })
    }

    private s3Client: S3Client

    /**
     * Uploads a file to S3
     * @param path The path to upload the file to
     * @param file The file to upload
     * @returns The path of the uploaded file
     */
    async putFile(path: string, file: Express.Multer.File): Promise<string> {
        const command = new PutObjectCommand({
            Bucket: this.config.s3.bucket,
            Key: path,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        try {
            await this.s3Client.send(command)

            return path
        } catch (error) {
            throw new FailedUploadError(error)
        }
    }

    /**
     * 
     * @param key The key of the file to delete
     */
    async deleteFile(key: string): Promise<void> {
        const command = new DeleteObjectCommand({
            Bucket: this.config.s3.bucket,
            Key: key,
        });

        try {
            await this.s3Client.send(command)
        } catch (error) {
            throw new FailedDeleteError(error)
        }
    }

    /**
     * Lists all directories in the S3 bucket with the given prefix
     * @param prefix The prefix of the files to list
     * @returns 
     */
    async getDirectories(prefix?: string): Promise<string[]> {
        let isTruncated = true;
        let continuationToken: string | undefined;
        const directories: string[] = [];

        while (isTruncated) {
            const command = new ListObjectsV2Command({
                Bucket: this.config.s3.bucket,
                Delimiter: '/',
                Prefix: prefix,
                ContinuationToken: continuationToken,
            });

            try {
                const response = await this.s3Client.send(command);

                // The response.CommonPrefixes array contains the "directories"
                if (response.CommonPrefixes) {
                    response.CommonPrefixes.forEach(commonPrefix => {
                        directories.push(commonPrefix.Prefix);
                    });
                }

                isTruncated = response.IsTruncated;
                continuationToken = response.NextContinuationToken;
            } catch (err) {
                console.error("Error listing directories:", err);
                isTruncated = false; // Stop the loop on error
            }
        }

        return directories
    }

    /**
     * Lists all files in the S3 bucket with the given prefix
     * @param prefix The prefix of the files to list
     * @returns 
     */
    async getFiles(prefix?: string): Promise<string[]> {
        const command = new ListObjectsV2Command({
            Bucket: this.config.s3.bucket,
            Prefix: prefix,
        })

        try {
            const response = await this.s3Client.send(command)
            const files = response.Contents?.map((item) => item.Key) ?? []
            if (files.length === 0) {
                throw new NoFileError()
            }

            return files
        } catch (error) {
            throw new FailedListFilesError(error)
        }
    }

    /**
     * Generates a presigned URL for the given file
     * @param key The key of the file to generate a presigned URL for
     * @returns 
     */
    async getPresignedUrl(key: string): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: this.config.s3.bucket,
            Key: key,
        })

        try {
            const signedUrl = await getSignedUrl(this.s3Client, command, {
                expiresIn: this.config.s3.expiresIn ?? 60 * 60
            })

            return signedUrl
        } catch (error) {
            throw new FailedPresignedUrlError(error)
        }
    }
}