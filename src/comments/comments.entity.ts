import { MovieEntity } from "@app/movies/movies.entity";
import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'comments' })
export class CommentEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => MovieEntity, movie => movie.id)
    movie_id: MovieEntity;

    @Column()
    message: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @BeforeUpdate()
    async updateTimestamp() {
        this.updatedAt = new Date();
    }
}
