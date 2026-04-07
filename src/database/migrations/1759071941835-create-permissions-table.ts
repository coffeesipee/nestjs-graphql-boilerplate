import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreatePermissionsTable1759071941835 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'permissions',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'code',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'description',
                    type: 'varchar',
                },
                {
                    name: 'is_active',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true,
                },
            ],
        }))

        await queryRunner.createIndex('permissions', new TableIndex({
            name: 'idx_permissions_code',
            columnNames: ['code'],
        }))

        await queryRunner.createIndex('permissions', new TableIndex({
            name: 'idx_permissions_is_active',
            columnNames: ['is_active'],
        }))

        await queryRunner.createIndex('permissions', new TableIndex({
            name: 'idx_permissions_deleted_at',
            columnNames: ['deleted_at'],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('permissions', 'idx_permissions_code')
        await queryRunner.dropIndex('permissions', 'idx_permissions_is_active')
        await queryRunner.dropIndex('permissions', 'idx_permissions_deleted_at')
        await queryRunner.dropTable('permissions')
    }

}
