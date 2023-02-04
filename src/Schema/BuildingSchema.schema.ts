import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Map } from "./MapSchema.schema";
export type BuildingDocument = Building & Document;
@Schema()
export class Building {
    @Prop()
    description: string;
    @Prop()
    streetName: string;
    @Prop()
    buildingNumber: string;
    @Prop({type: [{type:mongoose.Schema.Types.ObjectId, ref:'Map'}]})
    mapsBuilding: Map[];
}
export const BuildingSchema = SchemaFactory.createForClass(Building);