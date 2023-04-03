import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {  
    @IsNotEmpty()
    @ApiProperty({example: '1', description: "Унікальний номер"})
    id: string;
    @IsNotEmpty()
    @ApiProperty({example: 'sdfgdg', description: "Ім'я користувача"})  
    username: string;
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({example: 'ddfgg@gmail.com', description: "Email користувача"})  
    email: string;
}