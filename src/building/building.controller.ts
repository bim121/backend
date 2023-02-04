import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Building } from "../Schema/BuildingSchema.schema";
import { BuildingService } from "./building.service";


@Controller('/building')
export class BuildingController {
    constructor(private readonly buildingServerice: BuildingService) { }

    @Post('/add')
    async addBuilding(@Res() response, @Req() request, @Body() building: Building) {
        const requestBody = { description: request.building, streetName: request.building, buildingNumber: request.building }
        const newBuilding = await this.buildingServerice.createBuilding(requestBody);
        return response.status(HttpStatus.CREATED).json({
            newBuilding
        })
    }

    @Get()
    async getAll(@Query() id): Promise<Object> {
        return await this.buildingServerice.getAll(id);
    }

    @Delete('/:id')
    async delete(@Res() response, @Param('id') id) {
        await this.buildingServerice.delete(id);
        return response.status(HttpStatus.OK).json({
            building: null
        })
    }
}