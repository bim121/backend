import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { CreateCityDto } from "src/dto/city-dto";
import { CityService } from "./city.service";
import { BuildingService } from "src/building/building.service";
import { CreateBuildingDto } from "src/dto/building-dto";
import { SearchMapDto } from "src/dto/search-map-dto";


@Controller('/city')
export class CityController {
    constructor(private readonly cityServerice: CityService, private readonly buidlingService: BuildingService) { }

    @Post('/add')
    async addCity(@Body() dto: CreateCityDto) {
        return this.cityServerice.createCity(dto);
    }

    @Post('/building')
    async addBuilding(@Body() dto: CreateBuildingDto) {
        return this.cityServerice.addBuilding(dto);
    }

    @Get()
    getAll(){
        return this.cityServerice.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string){
        return this.cityServerice.getOne(id);
    }

    @Post('/search')
    searchMap(@Body() dto: SearchMapDto){
        return this.cityServerice.searchMap(dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.cityServerice.delete(id);
    }
}