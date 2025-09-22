import { Module } from '@nestjs/common';
import { UserResolver } from './resolvers/user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { MailModule } from 'src/mail/mail.module';
import { BullModule } from '@nestjs/bullmq';
import { UserConstant } from './user.constant';
import { WelcomePasswordJob } from './jobs/welcome-password.job';
import { EmailVerificationJob } from './jobs/email-verification.job';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BullModule.registerQueue({
      name: UserConstant.WELCOME_PASSWORD_JOB,
    }),
    BullModule.registerQueue({
      name: UserConstant.EMAIL_VERIFICATION_JOB,
    }),
    MailModule,
  ],
  providers: [UserResolver, UserService, WelcomePasswordJob, EmailVerificationJob],
  exports: [UserService],
})
export class UserModule { }

