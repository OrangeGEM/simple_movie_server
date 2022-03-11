import {MigrationInterface, QueryRunner} from "typeorm";

export class NullableCastInMovies1646999531652 implements MigrationInterface {
    name = 'NullableCastInMovies1646999531652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ALTER COLUMN "cast" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ALTER COLUMN "cast" SET NOT NULL`);
    }

}
