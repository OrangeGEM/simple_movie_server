import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUrlsToMovieEntity1647524673944 implements MigrationInterface {
    name = 'AddUrlsToMovieEntity1647524673944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ADD "urls" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "urls"`);
    }

}
