import { Module } from "@nestjs/common";
import { MailerModule } from '@nestjs-modules/mailer'

@Module({
    imports: [
        MailerModule.forRootAsync({
        }),
    ]
})
export class MailModule { }