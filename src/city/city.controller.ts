import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateCityDto } from "src/dto/city-dto";
import { CityService } from "./city.service";
import { BuildingService } from "src/building/building.service";
import { CreateBuildingDto } from "src/dto/building-dto";
import { SearchMapDto } from "src/dto/search-map-dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import Role from "src/enum/role.enum";
import RoleGuard from "src/Guard/role.guard";


@Controller('/city')
export class CityController {
    constructor(private readonly cityServerice: CityService, private readonly buidlingService: BuildingService) { }

    @ApiOperation({summary: 'Додавання міста'})
    @ApiResponse({status: 200})
    @Post('/add')
    @UseGuards(RoleGuard(Role.User))
    async addCity(@Body() dto: CreateCityDto) {
        return this.cityServerice.createCity(dto);
    }

    @ApiOperation({summary: 'Додавання будівлі міста'})
    @ApiResponse({status: 200})
    @Post('/building')
    async addBuilding(@Body() dto: CreateBuildingDto) {
        return this.cityServerice.addBuilding(dto);
    }

    @ApiOperation({summary: 'Отримання інформації про всі міста'})
    @ApiResponse({status: 200})
    @Get()
    async getAll(){
        return this.cityServerice.getAll();
    }

    @ApiOperation({summary: 'Отримання інформації про певне місто'})
    @ApiResponse({status: 200})
    @Get(':id')
    async getOne(@Param('id') id: string){
        return this.cityServerice.getOne(id);
    }

    @ApiOperation({summary: 'Пошук карти'})
    @ApiResponse({status: 200})
    @Post('/search')
    async searchMap(@Body() dto: SearchMapDto){
        return this.cityServerice.searchMap(dto);
    }

    @ApiOperation({summary: 'Видалення певного міста'})
    @ApiResponse({status: 200})
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.cityServerice.delete(id);
    }
}