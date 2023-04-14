import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1681499469950 implements MigrationInterface {
    name = ' $npmConfigName1681499469950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" ADD "location" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "location"`);
    }

}
