import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCountryDto{
    @IsNotEmpty() 
    @ApiProperty({example: 'This is country', description: "Опис країни"})  
    description: string;
    @IsNotEmpty()
    @ApiProperty({example: 'Ukraine', description: "Назва країни"})  
    countryName: string;
    @IsNotEmpty()
    @ApiProperty({example: 'center of Europe', description: "Локація країни"})  
    location: string;
}