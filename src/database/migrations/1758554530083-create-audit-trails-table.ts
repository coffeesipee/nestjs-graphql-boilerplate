import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateAuditTrailsTable1758554530083 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'audit_trails',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'resource_name',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'action',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'before_entity',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'after_entity',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'userinfo',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'user_ip',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'req_headers',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'req_body',
                    type: 'jsonb',
                    isNullable: true,
                },
                {
                    name: 'req_url',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'req_method',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'timestamp',
                    type: 'timestamp',
                    isNullable: true,
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

        await queryRunner.createIndices('audit_trails', [
            new TableIndex({
                name: 'idx_audit_trails_resource_name',
                columnNames: ['resource_name'],
            }),
            new TableIndex({
                name: 'idx_audit_trails_user_ip',
                columnNames: ['user_ip'],
            }),
            new TableIndex({
                name: 'idx_audit_trails_action',
                columnNames: ['action'],
            }),
            new TableIndex({
                name: 'idx_audit_trails_req_url',
                columnNames: ['req_url'],
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('audit_trails', true)
    }

}
