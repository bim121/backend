import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Building } from "./BuildingSchema.schema";
export type CityDocument = City & Document;
@Schema()
export class City {
    @Prop()
    description: string;
    @Prop()
    cityName: string;
    @Prop()
    countryName: string;
    @Prop({type: [{type:mongoose.Schema.Types.ObjectId, ref:'Building'}]})
    Buildings: Building[];
}
export const CitySchema = SchemaFactory.createForClass(City);