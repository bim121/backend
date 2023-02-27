import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
export type CityDocument = City & Document;
@Schema()
export class City {
    @Prop()
    description: string;
    @Prop()
    cityName: string;
    @Prop()
    countryName: string;
}
export const CitySchema = SchemaFactory.createForClass(City);