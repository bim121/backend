import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { MapModule } from "./map/map.module";
import { CityModule } from "./city/city.module";
import { BuildingModule } from "./building/building.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import {TypeOrmModule} from '@nestjs/typeorm';
import entities from './typeorm/entities';
import { AuthModule } from "./Auth/auth.module";
import * as path from 'path'
import { FileModule } from "./file/file.module";

@Module({
    imports: [
      ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, '..', 'public')}),
      
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
        FileModule,
        BuildingModule
      ]
})
export class AppModule{

}