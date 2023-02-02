import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Map } from "../Schema/MapSchema.schema";
import { MapService } from "./map.service";


@Controller('/map')
export class MapController {
    constructor(private readonly mapServerice: MapService) { }

    @Post('/add')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 }
    ]))
    async addMap(@Res() response, @Req() request, @Body() map: Map, @UploadedFiles() files: {picture?: Express.Multer.File[]}) {
        const requestBody = { floorNumbers: request.map, roomNumbers: request.map, picture: files.picture[0].filename }
        const newMap = await this.mapServerice.createMap(requestBody);
        return response.status(HttpStatus.CREATED).json({
            newMap
        })
    }

    @Get()
    async getAll(@Query() id): Promise<Object> {
        return await this.mapServerice.getAll(id);
    }

    @Delete('/:id')
    async delete(@Res() response, @Param('id') id) {
        await this.mapServerice.delete(id);
        return response.status(HttpStatus.OK).json({
            map: null
        })
    }
}