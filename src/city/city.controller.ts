import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { City } from "../Schema/CitySchema.schema";
import { CreateCityDto } from "src/dto/city-create-dto";
import { CityService } from "./city.service";
import { ObjectId } from "mongoose";


@Controller('/city')
export class CityController {
    constructor(private readonly cityServerice: CityService) { }

    @Post('/add')
    async addMap(@Body() dto: CreateCityDto) {
        return this.cityServerice.createCity(dto);
    }

    @Get()
    getAll(){
        return this.cityServerice.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId){
        return this.cityServerice.getOne(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: ObjectId) {
        await this.cityServerice.delete(id);
    }
}