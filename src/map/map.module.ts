import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MapEntity } from "src/entity/map.entity";
import { FileService } from "src/file/file.service";
import { MapController } from "./map.controller";
import { MapService } from "./map.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([MapEntity]),
    ],
    controllers: [MapController],
    providers: [MapService, FileService],
    exports: [MapService]
})
export class MapModule{
    
}