import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateMapDto } from "src/dto/map-dto";
import { MapService } from "./map.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import axios from "axios";


@Controller('/map')
export class MapController {
    constructor(private readonly mapServerice: MapService) { }

    @ApiOperation({summary: 'Додавання мапи'})
    @ApiResponse({status: 200})
    @Post('/add')
    @UseInterceptors(FileInterceptor('file'))
    async addMap(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateMapDto) {
        const map = await this.mapServerice.createMap(dto, file.buffer, file.originalname);

        await axios.post('https://webhook.site/e19cb110-84eb-464c-a742-7f9bf9b8a5d9', {
            event: 'map.created',
            data: map,
        });
        return map;
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