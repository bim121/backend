import { IsNotEmpty } from "class-validator";

export class CreateMapDto{
    @IsNotEmpty() name: string;
    @IsNotEmpty()floorNumber: number;
    @IsNotEmpty() roomNumber: string;
    @IsNotEmpty() buildingName:string;
}