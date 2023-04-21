import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1682061461167 implements MigrationInterface {
    name = ' $npmConfigName1682061461167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "building" RENAME COLUMN "description1" TO "description12"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "building" RENAME COLUMN "description12" TO "description1"`);
    }

}
