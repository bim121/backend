import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateCityDto } from "src/dto/city-create-dto";
import { City, CityDocument } from "../Schema/CitySchema.schema";

@Injectable()
export class CityService {
    constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>,
    ) { }


    async createCity(dto: CreateCityDto): Promise<City> {
        const newCity = new this.cityModel({...dto});
        return newCity.save();
    }


    async getAll(): Promise<City[]> {
       const cities = await this.cityModel.find();
       return cities;
    }

    async getOne(id: ObjectId): Promise<City>{
        const map = await this.cityModel.findById(id);
        return map;
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const map = await this.cityModel.findByIdAndDelete(id);
        return map.id;
    }
}