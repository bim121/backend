import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MapEntity } from "src/entity/map.entity";
import { Map, MapSchema } from "src/Schema/MapSchema.schema";
import { MapController } from "./map.controller";
import { MapService } from "./map.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([MapEntity]),
    ],
    controllers: [MapController],
    providers: [MapService],
    exports: [MapService]
})
export class MapModule{
    
}