import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { createHash } from "crypto";
import { ApiProperty } from "@nestjs/swagger";
import { hashPassword } from "@app/common/utils";

@Entity({ name: 'users' })
export class UserEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    email: string

    @ApiProperty()
    @Column({ select: false })
    password: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @BeforeUpdate()
    async updateTimestamp() {
        this.updatedAt = new Date();
    }

}