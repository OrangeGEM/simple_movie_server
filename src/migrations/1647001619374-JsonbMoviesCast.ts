import {MigrationInterface, QueryRunner} from "typeorm";

export class JsonbMoviesCast1647001619374 implements MigrationInterface {
    name = 'JsonbMoviesCast1647001619374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "cast"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "cast" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "cast"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "cast" character varying NOT NULL`);
    }

}
