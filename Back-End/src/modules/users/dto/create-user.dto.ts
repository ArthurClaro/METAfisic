import { hashSync } from "bcryptjs"
import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => hashSync(value, 10), { groups: ['transform'] })
    password: string

    @IsString()
    @IsNotEmpty()
    gender: "Masculino" | "Feminino" | "Outro"

    @IsNumber()
    @IsNotEmpty()
    height: number

    @IsNumber()
    @IsNotEmpty()
    weight: number
}