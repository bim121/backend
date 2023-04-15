import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { CreateBuildingDto } from "src/dto/building-dto";
import { CreateMapDto } from "src/dto/map-dto";
import { MapService } from "src/map/map.service";
import { BuildingService } from "./building.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Express } from 'express';


@Controller('/building')
export class BuildingController {
    constructor(private readonly buildingServerice: BuildingService, private readonly mapService: MapService) { }

    @ApiOperation({summary: 'Додавання будівлі'})
    @ApiResponse({status: 200})
    @Post('/add')
    async addBuilding(@Body() dto: CreateBuildingDto) {
        return this.buildingServerice.createBuilding(dto);
    }

    @ApiOperation({summary: 'Додавання мапи будівл'})
    @ApiResponse({status: 200})
    @Post('/map')
    @UseInterceptors(FileInterceptor('file'))
    async addMap(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateMapDto) {
        return this.buildingServerice.addMap(dto, file.buffer, file.originalname);
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