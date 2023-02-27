import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { CreateBuildingDto } from "src/dto/building-dto";
import { CreateMapDto } from "src/dto/map-dto";
import { MapService } from "src/map/map.service";
import { BuildingService } from "./building.service";


@Controller('/building')
export class BuildingController {
    constructor(private readonly buildingServerice: BuildingService, private readonly mapService: MapService) { }

    @Post('/add')
    async addBuilding(@Body() dto: CreateBuildingDto) {
        return this.buildingServerice.createBuilding(dto);
    }

    @Post('/map')
    async addMap(@Body() dto: CreateMapDto) {
        return this.buildingServerice.addMap(dto);
    }

    @Get()
    getAll(){
        return this.buildingServerice.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string){
        return this.buildingServerice.getOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.buildingServerice.delete(id);
    }
}