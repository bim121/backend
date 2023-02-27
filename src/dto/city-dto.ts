import { IsNotEmpty } from "class-validator";

export class CreateCityDto{
    @IsNotEmpty() description: string;
    @IsNotEmpty() cityName: string;
    @IsNotEmpty() countryName: string;
}