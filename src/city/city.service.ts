import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateCityDto } from "src/dto/city-dto";
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
        const city = await this.cityModel.findById(id);
        return city;
    }

    async delete(cid: ObjectId): Promise<ObjectId> {
        let {id} = await this.cityModel.findByIdAndDelete(cid);
        return id;
    }
}