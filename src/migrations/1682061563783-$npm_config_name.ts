import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1682061563783 implements MigrationInterface {
    name = ' $npmConfigName1682061563783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "building" ADD "test" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "building" DROP COLUMN "test"`);
    }

}
