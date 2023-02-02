import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Map, MapSchema } from "src/Schema/MapSchema.schema";
import { MapController } from "./map.controller";
import { MapService } from "./map.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Map.name, schema: MapSchema}]),
    ],
    controllers: [MapController],
    providers: [MapService]
})
export class MapModule{

}