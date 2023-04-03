import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SearchMapDto{
    @IsNotEmpty()
    @ApiProperty({example: 'Odessa', description: "Назва міста"})   
    cityName: string;
    @IsNotEmpty()
    @ApiProperty({example: 'CityCenter', description: "Назва будівлі"})  
    buildingName: string;
    @IsNotEmpty()
    @ApiProperty({example: 'main', description: "Назва карти"})  
    name: string;
}