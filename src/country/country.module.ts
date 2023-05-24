import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/Auth/auth.module";
import { BuildingModule } from "src/building/building.module";
import { BuildingEntity } from "src/entity/building.entity";
import { CityEntity } from "src/entity/city.entity";
import { MapEntity } from "src/entity/map.entity";
import { UserModule } from "src/user/user.module";
import { CountryEntity } from "src/entity/country.entity";
import { CountryController } from "./country.controller";
import { CountryService } from "./country.service";
import { CityModule } from "src/city/city.module";
import { ChatModule } from "src/Gateway/chat.module";
import { SearchModule } from "src/search/search.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([CountryEntity, CityEntity, BuildingEntity, MapEntity]),
        CityModule,
        BuildingModule,
        AuthModule,
        UserModule,
        ChatModule,
        SearchModule
    ],
    controllers: [CountryController],
    providers: [CountryService]
})
export class CountryModule{

}