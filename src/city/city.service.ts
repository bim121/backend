import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { City, CityDocument } from "../Schema/CitySchema.schema";

@Injectable()
export class CityService {
    constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>,
    ) { }


    async createCity(city: Object): Promise<City> {
        const newCity = new this.cityModel(city);
        return newCity.save();
    }


    async getAll(id): Promise<any> {
        if (id.id) {
            return this.cityModel.findOne({ _id: id.id }).populate("cityName").exec();
        }
        return this.cityModel.find().populate("cityName").exec();
    }

    async delete(id): Promise<any> {
        return await this.cityModel.findByIdAndRemove(id);
    }
}