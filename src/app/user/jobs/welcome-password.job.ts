import { Processor, WorkerHost } from "@nestjs/bullmq";
import { UserConstant } from "../user.constant";
import { MailerService } from "@nestjs-modules/mailer";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { User } from "../entities/user.entity";

@Processor(UserConstant.WELCOME_PASSWORD_JOB)
export class WelcomePasswordJob extends WorkerHost {
    private logger = new Logger(WelcomePasswordJob.name)

    constructor(
        private readonly mailerService: MailerService
    ) {
        super()
    }

    async process(job: Job<User>): Promise<any> {
        const { email } = job.data

        this.logger.log(`Sending email to ${email}`)

        this.mailerService.sendMail({
            to: email,
            subject: 'Welcome to our app',
            template: 'welcome-password',
            context: {
                name: job.data.fullname,
                url: 'http://localhost:3000/login',
            },
        })

        this.logger.log(`Email sent to ${email}`)
    }
}
