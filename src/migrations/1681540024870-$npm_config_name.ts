import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1681540024870 implements MigrationInterface {
    name = ' $npmConfigName1681540024870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "map" RENAME COLUMN "picturePath" TO "imageId"`);
        await queryRunner.query(`CREATE TABLE "public_file" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "key" character varying NOT NULL, CONSTRAINT "PK_bf2f5ba5aa6e3453b04cb4e4720" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "map" DROP COLUMN "imageId"`);
        await queryRunner.query(`ALTER TABLE "map" ADD "imageId" integer`);
        await queryRunner.query(`ALTER TABLE "map" ADD CONSTRAINT "UQ_eac79d1184f75d1d633e06ee9d0" UNIQUE ("imageId")`);
        await queryRunner.query(`ALTER TABLE "map" ADD CONSTRAINT "FK_eac79d1184f75d1d633e06ee9d0" FOREIGN KEY ("imageId") REFERENCES "public_file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "map" DROP CONSTRAINT "FK_eac79d1184f75d1d633e06ee9d0"`);
        await queryRunner.query(`ALTER TABLE "map" DROP CONSTRAINT "UQ_eac79d1184f75d1d633e06ee9d0"`);
        await queryRunner.query(`ALTER TABLE "map" DROP COLUMN "imageId"`);
        await queryRunner.query(`ALTER TABLE "map" ADD "imageId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "public_file"`);
        await queryRunner.query(`ALTER TABLE "map" RENAME COLUMN "imageId" TO "picturePath"`);
    }

}
