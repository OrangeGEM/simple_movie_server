import { CommentEntity } from "@app/comments/comments.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'movies' })
export class MovieEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    posterUrl: string;

    @Column()
    year: string;

    @Column()
    duration: string;
    
    @Column()
    rating: string;

    @Column({ nullable: true, type: 'jsonb' })
    cast: Array<string>; //String is JSON
    
    @OneToMany(() => CommentEntity, comments => comments.id)
    comments: CommentEntity[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @BeforeUpdate()
    async updateTimestamp() {
        this.updatedAt = new Date();
    }
}
