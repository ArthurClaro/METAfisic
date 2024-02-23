import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class LoginDto {

    @IsEmail()
    email: string

    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    password: string
}
