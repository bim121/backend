import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateBuildingDto } from "src/dto/building-create-dto";
import { Building, BuildingDocument } from "../Schema/BuildingSchema.schema";

@Injectable()
export class BuildingService {
    constructor(@InjectModel(Building.name) private buildingModel: Model<BuildingDocument>,
    ) { }

    async createBuilding(dto: CreateBuildingDto): Promise<Building> {
        const newBuilding = new this.buildingModel({...dto});
        return newBuilding.save();
    }

    async getAll(): Promise<Building[]> {
       const buildings = await this.buildingModel.find();
       return buildings;
    }

    async getOne(id: ObjectId): Promise<Building>{
        const building = await this.buildingModel.findById(id);
        return building;
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const building = await this.buildingModel.findByIdAndDelete(id);
        return building.id;
    }
}