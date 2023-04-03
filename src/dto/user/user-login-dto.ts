import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginUserDto {  
    @IsNotEmpty()
    @ApiProperty({example: 'gfghgg', description: "Ім'я користувача"})  
    readonly username: string;
    @IsNotEmpty()
    @ApiProperty({example: 'hggjjf', description: "Пароль користувача"})  
    readonly password: string;
}