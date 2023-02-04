import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Building, BuildingDocument } from "../Schema/BuildingSchema.schema";

@Injectable()
export class BuildingService {
    constructor(@InjectModel(Building.name) private buildingModel: Model<BuildingDocument>,
    ) { }


    async createBuilding(building: Object): Promise<Building> {
        const newBuilding = new this.buildingModel(building);
        return newBuilding.save();
    }


    async getAll(id): Promise<any> {
        if (id.id) {
            return this.buildingModel.findOne({ _id: id.id }).populate("streetName").exec();
        }
        return this.buildingModel.find().populate("streetName").exec();
    }

    async delete(id): Promise<any> {
        return await this.buildingModel.findByIdAndRemove(id);
    }
}