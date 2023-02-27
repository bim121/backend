import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { MongooseModule } from '@nestjs/mongoose';
import { MapModule } from "./map/map.module";
import { CityModule } from "./city/city.module";
import { BuildingModule } from "./building/building.module";


@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://bim121:admin@cluster0.ezwkcaw.mongodb.net/?retryWrites=true&w=majority'),
        UserModule,
        MapModule,
        CityModule,
        BuildingModule
      ]
})
export class AppModule{

}