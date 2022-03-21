import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginUserWithGoogleDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly token: string;
}