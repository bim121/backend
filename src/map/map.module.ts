import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MapEntity } from "src/entity/map.entity";
import { MapController } from "./map.controller";
import { MapService } from "./map.service";
import { FilesModule } from "src/file/file.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([MapEntity]),
        FilesModule
    ],
    controllers: [MapController],
    providers: [MapService],
    exports: [MapService]
})
export class MapModule{
    
}