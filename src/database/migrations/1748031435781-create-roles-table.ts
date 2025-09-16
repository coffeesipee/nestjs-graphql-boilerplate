import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateRolesTable1758031435781 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'roles',
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
                    isUnique: false,
                    isNullable: false,
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

        await queryRunner.createForeignKey('users', new TableForeignKey({
            columnNames: ['role_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'roles',
            onDelete: 'restrict',
        }))

        await queryRunner.createIndex('roles', new TableIndex({
            columnNames: ['is_active'],
            isUnique: false,
            name: 'roles_is_active_idx',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
