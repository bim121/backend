import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type MapDocument = Map & Document;
@Schema()
export class Map {
    @Prop({required:true})
    picrture: string;
    @Prop({required:true})
    floorNumbers: number;
    @Prop({required:true})
    roomNumber: number;
}
export const MapSchema = SchemaFactory.createForClass(Map);