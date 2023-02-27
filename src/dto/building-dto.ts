import { IsNotEmpty } from "class-validator";

export class CreateBuildingDto{
    @IsNotEmpty() description: string;
    @IsNotEmpty() streetName: string;
    @IsNotEmpty() buildingName: string;
}