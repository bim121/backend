import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCityDto{
    @IsNotEmpty() 
    @ApiProperty({example: 'This is city', description: "Опис міста"})  
    description: string;
    @IsNotEmpty()
    @ApiProperty({example: 'Odessa', description: "Назва міста"})  
    cityName: string;
    @IsNotEmpty()
    @ApiProperty({example: 'Ukraine', description: "Назва країни"})  
    countryName: string;
}