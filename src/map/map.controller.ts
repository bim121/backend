import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateMapDto } from "src/dto/map-dto";
import { MapService } from "./map.service";


@Controller('/map')
export class MapController {
    constructor(private readonly mapServerice: MapService) { }

    @Post('/add')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
    ]))
    addMap(@UploadedFiles() files, @Body() dto: CreateMapDto) {
        const {picture} = files;
        return this.mapServerice.createMap(dto, picture[0]);
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