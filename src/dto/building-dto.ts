import { IsNotEmpty } from "class-validator";

export class CreateBuildingDto{
    @IsNotEmpty() description: string;
    @IsNotEmpty() cityName: string;
    @IsNotEmpty() buildingName: string;
    @IsNotEmpty() streetName: string;
}