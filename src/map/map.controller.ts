import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { CreateMapDto } from "src/dto/map-dto";
import { MapService } from "./map.service";


@Controller('/map')
export class MapController {
    constructor(private readonly mapServerice: MapService) { }

    @Post('/add')
    async addBuilding(@Body() dto: CreateMapDto) {
        return this.mapServerice.createMap(dto);
    }

    @Get()
    getAll(){
        return this.mapServerice.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string){
        return this.mapServerice.getOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.mapServerice.delete(id);
    }
}