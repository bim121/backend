import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateMapDto } from "src/dto/map-dto";
import { MapService } from "./map.service";


@Controller('/map')
export class MapController {
    constructor(private readonly mapServerice: MapService) { }

    @ApiOperation({summary: 'Додавання мапи'})
    @ApiResponse({status: 200})
    @Post('/add')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
    ]))
    addMap(@UploadedFiles() files, @Body() dto: CreateMapDto) {
        const {picture} = files;
        return this.mapServerice.createMap(dto, picture[0]);
    }

    @ApiOperation({summary: 'Отримання усіх мап'})
    @ApiResponse({status: 200})
    @Get()
    getAll(){
        return this.mapServerice.getAll();
    }

    @ApiOperation({summary: 'Отримання певної мапи'})
    @ApiResponse({status: 200})
    @Get(':id')
    getOne(@Param('id') id: string){
        return this.mapServerice.getOne(id);
    }

    @ApiOperation({summary: 'Видалення мапи'})
    @ApiResponse({status: 200})
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.mapServerice.delete(id);
    }
}