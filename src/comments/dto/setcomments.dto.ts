import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SetCommentsDto {
    @ApiProperty()
    @IsNotEmpty()
    movie_id: number;

    @ApiProperty()
    @IsNotEmpty()
    message: string;
}