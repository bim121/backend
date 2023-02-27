import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuildingModule } from "src/building/building.module";
import { BuildingEntity } from "src/entity/building.entity";
import { CityEntity } from "src/entity/city.entity";
import { CityController } from "./city.controller";
import { CityService } from "./city.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([CityEntity, BuildingEntity]),
        BuildingModule
    ],
    controllers: [CityController],
    providers: [CityService]
})
export class CityModule{

}