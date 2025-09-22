import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from "typeorm";

export class AddColumnIsActiveToUsersTable1758507423287 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'is_active',
            type: 'boolean',
            default: true,
        }))

        await queryRunner.createIndex('users', new TableIndex({
            name: 'users_is_active_idx',
            columnNames: ['is_active'],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'is_active')
    }

}
