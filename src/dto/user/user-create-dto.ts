import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {  
  @IsNotEmpty()
  @ApiProperty({example: 'bim', description: "Ім'я користувача"})
  username: string;
  @IsNotEmpty()  
  @ApiProperty({example: 'sdfgdg', description: "Пароль користувача"})
  password: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({example: 'gfhgdg@gmail.com', description: "Email користувача"})
  email: string;
}