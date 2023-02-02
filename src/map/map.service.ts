import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Map, MapDocument } from "../Schema/MapSchema.schema";

@Injectable()
export class MapService {
    constructor(@InjectModel(Map.name) private mapModel: Model<MapDocument>,
    ) { }


    async createMap(map: Object): Promise<Map> {
        const newMap = new this.mapModel(map);
        return newMap.save();
    }


    async getAll(id): Promise<any> {
        if (id.id) {
            return this.mapModel.findOne({ _id: id.id }).populate("roomNumber").exec();
        }
        return this.mapModel.find().populate("roomNumber").exec();
    }

    async delete(id): Promise<any> {
        return await this.mapModel.findByIdAndRemove(id);
    }
}