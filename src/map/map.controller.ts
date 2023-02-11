import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ObjectId } from "mongoose";
import { CreateMapDto } from "src/dto/map-create-dto";
import { Map } from "../Schema/MapSchema.schema";
import { MapService } from "./map.service";


@Controller('/map')
export class MapController {
    constructor(private readonly mapServerice: MapService) { }

    @Post('/add')
    async addMap(@Body() dto: CreateMapDto) {
        return this.mapServerice.createMap(dto);
    }

    @Get()
    getAll(){
        return this.mapServerice.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId){
        return this.mapServerice.getOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: ObjectId) {
        await this.mapServerice.delete(id);
    }
}