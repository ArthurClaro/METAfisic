import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTrainingDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    serie: number

    @IsNumber()
    @IsNotEmpty()
    kg: number

    @IsNumber()
    @IsNotEmpty()
    repetitions: number
}