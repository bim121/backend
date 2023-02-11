import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { CreateBuildingDto } from "src/dto/building-create-dto";
import { Building } from "../Schema/BuildingSchema.schema";
import { BuildingService } from "./building.service";


@Controller('/building')
export class BuildingController {
    constructor(private readonly buildingServerice: BuildingService) { }

    @Post('/add')
    async addBuilding(@Body() dto: CreateBuildingDto) {
        return this.buildingServerice.createBuilding(dto);
    }

    @Get()
    getAll(){
        return this.buildingServerice.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId){
        return this.buildingServerice.getOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: ObjectId) {
        await this.buildingServerice.delete(id);
    }
}