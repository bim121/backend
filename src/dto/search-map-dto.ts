import { IsNotEmpty } from "class-validator";

export class SearchMapDto{
    @IsNotEmpty() cityName: string;
    @IsNotEmpty() buildingName: string;
    @IsNotEmpty() name: string;
}