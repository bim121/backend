import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateMapDto{
    @IsNotEmpty()
    @ApiProperty({example: 'main', description: "Назва карти"})   
    name: string;
    @IsNotEmpty()
    @ApiProperty({example: '1', description: "Номер поверха"})  
    floorNumber: number;
    @IsNotEmpty()
    @ApiProperty({example: '1/2', description: "Номер кімнати"})  
    roomNumber: string;
    @IsNotEmpty()
    @ApiProperty({example: 'CityCenter', description: "Назва будівлі"})  
    buildingName:string;
    @IsNotEmpty() 
    @ApiProperty({example: 'image/sfdg.png', description: "Зображення карти"})  
    picture: string;
}