import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
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
    async addMap(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateMapDto) {
       return await this.mapServerice.createMap(dto, file.buffer, file.originalname);
    }

    @ApiOperation({summary: 'Отримання усіх мап'})
    @ApiResponse({status: 200})
    @Get()
    async getAll(){
        return this.mapServerice.getAll();
    }

    @ApiOperation({summary: 'Отримання певної мапи'})
    @ApiResponse({status: 200})
    @Get(':id')
    async getOne(@Param('id') id: number){
        return this.mapServerice.getOne(id);
    }

    @ApiOperation({summary: 'Видалення мапи'})
    @ApiResponse({status: 200})
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.mapServerice.delete(id);
    }
}