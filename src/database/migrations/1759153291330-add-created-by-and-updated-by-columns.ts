import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCreatedByAndUpdatedByColumns1759153291330 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('roles', [
            new TableColumn({
                name: 'created_by',
                type: 'uuid',
                isNullable: true,
            }),
            new TableColumn({
                name: 'updated_by',
                type: 'uuid',
                isNullable: true,
            })
        ])

        await queryRunner.addColumns('applications', [
            new TableColumn({
                name: 'created_by',
                type: 'uuid',
                isNullable: true,
            }),
            new TableColumn({
                name: 'updated_by',
                type: 'uuid',
                isNullable: true,
            })
        ])

        await queryRunner.addColumns('permissions', [
            new TableColumn({
                name: 'created_by',
                type: 'uuid',
                isNullable: true,
            }),
            new TableColumn({
                name: 'updated_by',
                type: 'uuid',
                isNullable: true,
            })
        ])

        await queryRunner.addColumns('users', [
            new TableColumn({
                name: 'created_by',
                type: 'uuid',
                isNullable: true,
            }),
            new TableColumn({
                name: 'updated_by',
                type: 'uuid',
                isNullable: true,
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('roles', 'created_by')
        await queryRunner.dropColumn('roles', 'updated_by')

        await queryRunner.dropColumn('applications', 'created_by')
        await queryRunner.dropColumn('applications', 'updated_by')

        await queryRunner.dropColumn('permissions', 'created_by')
        await queryRunner.dropColumn('permissions', 'updated_by')

        await queryRunner.dropColumn('users', 'created_by')
        await queryRunner.dropColumn('users', 'updated_by')
    }

}
