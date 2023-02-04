import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Building, BuildingSchema } from "src/Schema/BuildingSchema.schema";
import { BuildingController } from "./building.controller";
import { BuildingService } from "./building.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Building.name, schema: BuildingSchema}]),
    ],
    controllers: [BuildingController],
    providers: [BuildingService]
})
export class BuildingModule{

}