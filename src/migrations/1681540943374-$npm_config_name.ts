import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1681540943374 implements MigrationInterface {
    name = ' $npmConfigName1681540943374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "map" DROP CONSTRAINT "FK_eac79d1184f75d1d633e06ee9d0"`);
        await queryRunner.query(`ALTER TABLE "public_file" DROP CONSTRAINT "PK_bf2f5ba5aa6e3453b04cb4e4720"`);
        await queryRunner.query(`ALTER TABLE "public_file" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public_file" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "public_file" ADD CONSTRAINT "PK_bf2f5ba5aa6e3453b04cb4e4720" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "map" DROP CONSTRAINT "UQ_eac79d1184f75d1d633e06ee9d0"`);
        await queryRunner.query(`ALTER TABLE "map" DROP COLUMN "imageId"`);
        await queryRunner.query(`ALTER TABLE "map" ADD "imageId" uuid`);
        await queryRunner.query(`ALTER TABLE "map" ADD CONSTRAINT "UQ_eac79d1184f75d1d633e06ee9d0" UNIQUE ("imageId")`);
        await queryRunner.query(`ALTER TABLE "map" ADD CONSTRAINT "FK_eac79d1184f75d1d633e06ee9d0" FOREIGN KEY ("imageId") REFERENCES "public_file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "map" DROP CONSTRAINT "FK_eac79d1184f75d1d633e06ee9d0"`);
        await queryRunner.query(`ALTER TABLE "map" DROP CONSTRAINT "UQ_eac79d1184f75d1d633e06ee9d0"`);
        await queryRunner.query(`ALTER TABLE "map" DROP COLUMN "imageId"`);
        await queryRunner.query(`ALTER TABLE "map" ADD "imageId" integer`);
        await queryRunner.query(`ALTER TABLE "map" ADD CONSTRAINT "UQ_eac79d1184f75d1d633e06ee9d0" UNIQUE ("imageId")`);
        await queryRunner.query(`ALTER TABLE "public_file" DROP CONSTRAINT "PK_bf2f5ba5aa6e3453b04cb4e4720"`);
        await queryRunner.query(`ALTER TABLE "public_file" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public_file" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public_file" ADD CONSTRAINT "PK_bf2f5ba5aa6e3453b04cb4e4720" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "map" ADD CONSTRAINT "FK_eac79d1184f75d1d633e06ee9d0" FOREIGN KEY ("imageId") REFERENCES "public_file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
