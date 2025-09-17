import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './app/user/user.module';
import { ApplicationModule } from './app/application/application.module';
import { PostgreSQLDBModule } from './database/postgresql.module';
import { FileModule } from './app/file/file.module';
import { RoleModule } from './app/role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    PostgreSQLDBModule,

    ApplicationModule,
    FileModule,
    UserModule,
    RoleModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      path: '/graphql',
    }),
  ],
})
export class AppModule {}
