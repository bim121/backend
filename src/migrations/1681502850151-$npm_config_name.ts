import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1681502850151 implements MigrationInterface {
    name = ' $npmConfigName1681502850151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "test" character varying NOT NULL DEFAULT 'sdf'`);
    }

}
