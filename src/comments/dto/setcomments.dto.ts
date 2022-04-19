import { ApiProperty } from "@nestjs/swagger";

export class SetCommentsDto {
    @ApiProperty()
    movie_id: number;

    @ApiProperty()
    message: string;
}