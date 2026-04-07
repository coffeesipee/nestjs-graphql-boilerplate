import { MigrationInterface, QueryRunner } from "typeorm";

export class SetupReplicationPub1759371947076 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`CREATE PUBLICATION loyalty_cdc_pub FOR TABLE roles`)
        // await queryRunner.query(`SELECT pg_create_logical_replication_slot('${process.env.CDC_SLOT_NAME}', 'wal2json')`)
        // await queryRunner.query(`ALTER USER ${process.env.DB_USERNAME} WITH REPLICATION`)
        // await queryRunner.query(`GRANT ALL ON ALL TABLES IN SCHEMA public TO ${process.env.DB_USERNAME}`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
