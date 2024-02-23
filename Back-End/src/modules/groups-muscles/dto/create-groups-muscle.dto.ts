import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

export class CreateGroupsMuscleDto {
    // id: string

    @IsString()
    @IsNotEmpty()
    nome: string
}
