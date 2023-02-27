import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { MongooseModule } from '@nestjs/mongoose';
import { MapModule } from "./map/map.module";
import { CityModule } from "./city/city.module";
import { BuildingModule } from "./building/building.module";
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import entities from './typeorm/entities';
import { AuthModule } from "./Auth/auth.module";

@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'myDataBase',
        entities: entities,
        synchronize: true,
      }),
        MongooseModule.forRoot('mongodb+srv://bim121:admin@cluster0.ezwkcaw.mongodb.net/?retryWrites=true&w=majority'),
        AuthModule,
        MapModule,
        CityModule,
        BuildingModule
      ]
})
export class AppModule{

}