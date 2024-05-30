import { IsNotEmpty, IsString } from "class-validator"

export class CreateDayDto {
    @IsString()
    @IsNotEmpty()
    category: string
}