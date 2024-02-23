import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

export class CreateDayDto {
    @IsString()
    @IsNotEmpty()
    category: string

    // @IsDate()
    // @Transform(date1 => moment(date1).format('DD/MM/YY'))
    // createdAt: Date;
}
