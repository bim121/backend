import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateMapDto } from "src/dto/map-create-dto";
import { Map, MapDocument } from "../Schema/MapSchema.schema";

@Injectable()
export class MapService {
    constructor(@InjectModel(Map.name) private mapModel: Model<MapDocument>,
    ) { }


    async createMap(dto: CreateMapDto): Promise<Map> {
        const newMap = new this.mapModel({...dto});
        return newMap.save();
    }


    async getAll(): Promise<Map[]> {
       const maps = await this.mapModel.find();
       return maps;
    }

    async getOne(id: ObjectId): Promise<Map>{
        const map = await this.mapModel.findById(id);
        return map;
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const map = await this.mapModel.findByIdAndDelete(id);
        return map.id;
    }
}