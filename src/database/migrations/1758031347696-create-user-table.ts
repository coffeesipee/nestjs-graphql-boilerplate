import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateUserTable1758031347696 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'role_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'verified_at',
                    type: 'timestamp with time zone',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp with time zone',
                    isNullable: true,
                }
            ]
        }), true)

        await queryRunner.createIndex('users', new TableIndex({
            columnNames: ['email'],
            isUnique: true,
            name: 'users_email_idx',
        }))

        await queryRunner.createIndex('users', new TableIndex({
            columnNames: ['role_id'],
            isUnique: false,
            name: 'users_role_id_idx',
        }))

        await queryRunner.createIndex('users', new TableIndex({
            columnNames: ['verified_at'],
            isUnique: false,
            name: 'users_verified_at_idx',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
        await queryRunner.dropForeignKey('users', 'users_role_id')
    }

}
