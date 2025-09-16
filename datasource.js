require('dotenv').config({ path: '.env' })
const { join } = require('path')
const { DataSource } = require('typeorm')
require('reflect-metadata')

const isProd = process.env.NODE_ENV === 'production'

const {
    DATABASE_URL,
    DB_HOST = 'localhost',
    DB_PORT = '5432',
    DB_USERNAME = 'postgres',
    DB_PASSWORD = 'password',
    DB_NAME = 'boilerplate',
    NODE_ENV = 'development',
} = process.env

const dataSource = new DataSource({
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
    entities: [join(process.cwd(), 'src/**/*.entity{.ts,.js}')],
    migrations: [join(process.cwd(), 'src/database/migrations/*{.ts,.js}')],
    synchronize: false,
    logging: !isProd,
})

module.exports = dataSource
