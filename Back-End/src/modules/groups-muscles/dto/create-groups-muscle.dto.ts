import { IsNotEmpty, IsString } from "class-validator"

export class CreateGroupsMuscleDto {
    @IsString()
    @IsNotEmpty()
    nome: string
}