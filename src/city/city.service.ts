import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BuildingService } from "src/building/building.service";
import { CreateBuildingDto } from "src/dto/building-dto";
import { CreateCityDto } from "src/dto/city-dto";
import { BuildingEntity } from "src/entity/building.entity";
import { CityEntity } from "src/entity/city.entity";
import { MapEntity } from "src/entity/map.entity";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(CityEntity)    
        private readonly cityRepo: Repository<CityEntity>, 
        @InjectRepository(BuildingEntity) private readonly buildingRepo: Repository<MapEntity>, private readonly buildingService: BuildingService) {}

    async createCity(cityDto: CreateCityDto): Promise<CreateCityDto> {    
        const { description, countryName, cityName } = cityDto;

        const cityInDb = await this.cityRepo.findOne({ 
            where: { cityName } 
        });

        if (cityInDb) {
            throw new HttpException('city already exists', HttpStatus.BAD_REQUEST);    
        }
        
        const city: CityEntity = await this.cityRepo.create({ description, countryName, cityName });
        await this.cityRepo.save(city);
        return city;  
    }

    async getAll(): Promise<CityEntity[]> {
        return this.cityRepo.find();
    }

    async addBuilding(dto: CreateBuildingDto): Promise<CityEntity> {
        const building = await this.buildingService.createBuilding(dto);
        const cityName =  building .cityName;
        const city = await this.cityRepo.findOne( {where: { cityName} });
        building.city = city;
        this.buildingRepo.save(building);
        return city;
    }

    async getOne(id: string): Promise<CityEntity> {
        
        return await this.cityRepo.findOne({
            where: {
                id
            },
            relations: {
                buildings: true,
            },
        })
    }

    async delete(id: string): Promise<void> {
        await this.buildingRepo.delete({id});
    }
}