import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateApplicationsTable1758032232973 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'applications',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'code',
                    type: 'varchar',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'is_active',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'logo',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'url',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'api_key',
                    type: 'varchar',
                    isNullable: false,
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

        await queryRunner.createIndex('applications', new TableIndex({
            columnNames: ['code'],
            isUnique: true,
            name: 'applications_code_idx',
        }))

        await queryRunner.createIndex('applications', new TableIndex({
            columnNames: ['is_active'],
            isUnique: false,
            name: 'applications_is_active_idx',
        }))

        await queryRunner.createIndex('applications', new TableIndex({
            columnNames: ['deleted_at'],
            isUnique: false,
            name: 'applications_deleted_at_idx',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('applications', 'applications_code_idx')
        await queryRunner.dropIndex('applications', 'applications_is_active_idx')
        await queryRunner.dropTable('applications')
    }

}
