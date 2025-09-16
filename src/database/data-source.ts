import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: '.env' });

// Support either a single DATABASE_URL or individual PG env vars
const {
    DATABASE_URL,
    DB_HOST = 'localhost',
    DB_PORT = '5432',
    DB_USERNAME = 'postgres',
    DB_PASSWORD = 'password',
    DB_NAME = 'boilerplate',
    NODE_ENV = 'development',
} = process.env as Record<string, string>;

const isProd = NODE_ENV === 'production';

export default new DataSource({
    type: 'postgres',
    url: DATABASE_URL || undefined,
    host: DATABASE_URL ? undefined : DB_HOST,
    port: DATABASE_URL ? undefined : parseInt(DB_PORT, 10),
    username: DATABASE_URL ? undefined : DB_USERNAME,
    password: DATABASE_URL ? undefined : DB_PASSWORD,
    database: DATABASE_URL ? undefined : DB_NAME,
    ssl: !!(isProd && process.env.PGSSLMODE !== 'disable')
        ? { rejectUnauthorized: false }
        : undefined,
    // Adjust entities path if you add TypeORM entities later
    entities: [join(process.cwd(), 'src/**/*.entity{.ts,.js}')],
    migrations: [join(process.cwd(), 'src/database/migrations/*{.ts,.js}')],
    synchronize: false,
    logging: !isProd,
});
