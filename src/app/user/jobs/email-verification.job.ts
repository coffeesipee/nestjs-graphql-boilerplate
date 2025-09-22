import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from 'bullmq'
import { User } from "../entities/user.entity";
import { UserConstant } from "../user.constant";
import { MailerService } from "@nestjs-modules/mailer";
import { Logger } from "@nestjs/common";

@Processor(UserConstant.EMAIL_VERIFICATION_JOB)
export class EmailVerificationJob extends WorkerHost {
    constructor(
        private readonly mailerService: MailerService
    ) {
        super()
    }

    private logger = new Logger(EmailVerificationJob.name)

    async process(job: Job<User>): Promise<any> {
        const { email } = job.data

        this.logger.log(`Sending email to ${email}`)

        this.mailerService.sendMail({
            to: email,
            subject: 'Email Verification',
            template: 'email-confirmation',
            context: {
                name: job.data.fullname,
                url: 'http://localhost:3000/verify-email',
            },
        })

        this.logger.log(`Email sent to ${email}`)
    }
}