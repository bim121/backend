import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/Auth/auth.module";
import { BuildingModule } from "src/building/building.module";
import { BuildingEntity } from "src/entity/building.entity";
import { CityEntity } from "src/entity/city.entity";
import { MapEntity } from "src/entity/map.entity";
import { UserModule } from "src/user/user.module";
import { CityController } from "./city.controller";
import { CityService } from "./city.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([CityEntity, BuildingEntity, MapEntity]),
        BuildingModule,
        AuthModule,
        UserModule
    ],
    controllers: [CityController],
    providers: [CityService]
})
export class CityModule{

}