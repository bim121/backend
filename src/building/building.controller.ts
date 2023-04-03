import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateBuildingDto } from "src/dto/building-dto";
import { CreateMapDto } from "src/dto/map-dto";
import { MapService } from "src/map/map.service";
import { BuildingService } from "./building.service";


@Controller('/building')
export class BuildingController {
    constructor(private readonly buildingServerice: BuildingService, private readonly mapService: MapService) { }

    @ApiOperation({summary: 'Додавання мапи будівлі'})
    @ApiResponse({status: 200})
    @Post('/add')
    async addBuilding(@Body() dto: CreateBuildingDto) {
        return this.buildingServerice.createBuilding(dto);
    }

    @ApiOperation({summary: '???'})
    @ApiResponse({status: 200})
    @Post('/map')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 }
    ]))
    async addMap(@UploadedFiles() files, @Body() dto: CreateMapDto) {
        const {picture} = files;
        return this.buildingServerice.addMap(dto, picture[0]);
    }

    @ApiOperation({summary: 'Отримання інфомації про всі будівлі'})
    @ApiResponse({status: 200})
    @Get()
    getAll(){
        return this.buildingServerice.getAll();
    }

    @ApiOperation({summary: 'Отримання інформації про певну будівлю'})
    @ApiResponse({status: 200})
    @Get(':id')
    getOne(@Param('id') id: string){
        return this.buildingServerice.getOne(id);
    }

    @ApiOperation({summary: 'Видалення мапи будівлі'})
    @ApiResponse({status: 200})
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.buildingServerice.delete(id);
    }
}