import { Injectable, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChatGateway } from "src/Gateway/chat.gateway";
import { BuildingService } from "src/building/building.service";
import { CreateBuildingDto } from "src/dto/building-dto";
import { CreateCityDto } from "src/dto/city-dto";
import { SearchMapDto } from "src/dto/search-map-dto";
import { BuildingEntity } from "src/entity/building.entity";
import { CityEntity } from "src/entity/city.entity";
import { MapEntity } from "src/entity/map.entity";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(CityEntity)    
        private readonly cityRepo: Repository<CityEntity>, 
        @InjectRepository(BuildingEntity) private readonly buildingRepo: Repository<BuildingEntity>,
         private readonly buildingService: BuildingService,
         private readonly chatGateway: ChatGateway) {}

    async createCity(cityDto: CreateCityDto): Promise<CityEntity> {    
        const { description, countryName, cityName } = cityDto;

        const cityInDb = await this.cityRepo.findOne({ 
            where: { cityName } 
        });

        if (cityInDb) {
            throw new HttpException('city already exists', HttpStatus.BAD_REQUEST);    
        }
        
        const city: CityEntity = await this.cityRepo.create({ description, countryName, cityName });
        await this.cityRepo.save(city);
        this.chatGateway.sendInfo("city with name: " + cityName + ", country: " + countryName + ", description: " + description);
        return city;  
    }

    async getAll(): Promise<CityEntity[]> {
        return this.cityRepo.find();
    }

    async addBuilding(dto: CreateBuildingDto): Promise<CityEntity> {
        const building = await this.buildingService.createBuilding(dto);
        const cityName =  building.cityName;
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
        await this.cityRepo.delete({id});
    }

    async searchMap(dto: SearchMapDto): Promise<MapEntity>{
        const cityName =  dto.cityName; const buildingName = dto.buildingName;

        const city = await this.cityRepo.findOne({
            where: {
                cityName
            },
            relations: {
                buildings: true,
            },
        });
        const findBuilding = city.buildings.find((value)=>{ return value.buildingName === dto.buildingName; }); 

        if(!findBuilding){
            throw new HttpException('building do not exists', HttpStatus.BAD_REQUEST);    
        }

        const building = await this.buildingRepo.findOne({
            where: {
                buildingName,
            },
            relations: {
                maps: true,
            },
        });

        const map = building.maps.find((value)=>{ return value.name === dto.name; }); 

        if(!map){
            throw new HttpException('Map do not exists', HttpStatus.BAD_REQUEST);    
        }

        return map;
    }
}