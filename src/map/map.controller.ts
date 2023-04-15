import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { CreateMapDto } from "src/dto/map-dto";
import { MapService } from "./map.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";


@Controller('/map')
export class MapController {
    constructor(private readonly mapServerice: MapService) { }

    @ApiOperation({summary: 'Додавання мапи'})
    @ApiResponse({status: 200})
    @Post('/add')
    @UseInterceptors(FileInterceptor('file'))
    addMap(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateMapDto) {
        return this.mapServerice.createMap(dto, file.buffer, file.originalname);
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
    getOne(@Param('id') id: number){
        return this.mapServerice.getOne(id);
    }

    @ApiOperation({summary: 'Видалення мапи'})
    @ApiResponse({status: 200})
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.mapServerice.delete(id);
    }
}