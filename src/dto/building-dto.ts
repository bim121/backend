import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateBuildingDto{
    @IsNotEmpty()
    @ApiProperty({example: 'this building', description: "Опис будівлі"})  
    description: string;
    @IsNotEmpty()
    @ApiProperty({example: 'Odessa', description: "Назва міста"})  
    cityName: string;
    @IsNotEmpty()
    @ApiProperty({example: 'CutyCenter', description: "Назва будівлі"})  
    buildingName: string;
    @IsNotEmpty()
    @ApiProperty({example: 'Veshneva', description: "Назва вулиці"})  
    streetName: string;
}