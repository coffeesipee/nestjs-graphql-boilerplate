import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnFullnameToUsersTable1758295225445 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
	    await queryRunner.addColumn('users', new TableColumn({
		    name: 'fullname',
		    type: 'varchar',
		    length: '100',
		    isNullable: false,
	    }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
	    await queryRunner.dropColumn('users', 'fullname')
    }

}
