import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { City } from "../Schema/CitySchema.schema";
import { CityService } from "./city.service";


@Controller('/city')
export class CityController {
    constructor(private readonly cityServerice: CityService) { }

    @Post('/add')
    async addCity(@Res() response, @Req() request, @Body() city: City) {
        const requestBody = { description: request.city, cityName: request.city, countryName: request.city }
        const newCity = await this.cityServerice.createCity(requestBody);
        return response.status(HttpStatus.CREATED).json({
            newCity
        })
    }

    @Get()
    async getAll(@Query() id): Promise<Object> {
        return await this.cityServerice.getAll(id);
    }

    @Delete('/:id')
    async delete(@Res() response, @Param('id') id) {
        await this.cityServerice.delete(id);
        return response.status(HttpStatus.OK).json({
            building: null
        })
    }
}