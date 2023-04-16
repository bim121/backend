import { Body, Controller, Delete, Get,  Param, Post } from "@nestjs/common";
import { CreateCityDto } from "src/dto/city-dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CityService } from "src/city/city.service";
import { CreateCountryDto } from "src/dto/country-dto";
import { CountryService } from "./country.service";


@Controller('/country')
export class CountryController {
    constructor(private readonly countryServerice: CountryService, private readonly cityService: CityService) { }

    @ApiOperation({summary: 'Додавання країни'})
    @ApiResponse({status: 200})
    @Post('/add')
    async addCountry(@Body() dto: CreateCountryDto) {
        return this.countryServerice.createCountry(dto);
    }

    @ApiOperation({summary: 'Додавання країни'})
    @ApiResponse({status: 200})
    @Post('/city')
    async addCity(@Body() dto: CreateCityDto) {
        return this.countryServerice.addCity(dto);
    }

    @ApiOperation({summary: 'Отримання інформації про всі країни'})
    @ApiResponse({status: 200})
    @Get()
    async getAll(){
        return this.countryServerice.getAll();
    }

    @ApiOperation({summary: 'Отримання інформації про певну країну'})
    @ApiResponse({status: 200})
    @Get(':id')
    async getOne(@Param('id') id: string){
        return this.countryServerice.getOne(id);
    }
    @ApiOperation({summary: 'Видалення певної країни'})
    @ApiResponse({status: 200})
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.countryServerice.delete(id);
    }
}