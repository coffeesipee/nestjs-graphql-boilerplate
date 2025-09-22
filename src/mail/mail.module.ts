import { Module } from "@nestjs/common";
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigService } from "@nestjs/config";
import { join } from "path";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                transport: configService.get('mail.transport'),
                defaults: {
                    from: configService.get('mail.from'),
                },
                template: {
                    dir: join(process.cwd(), configService.get('mail.templateDir')),
                    adapter: new HandlebarsAdapter(),
                },
            }),
            inject: [ConfigService]
        }),
    ],
    exports: [MailerModule]
})
export class MailModule { }