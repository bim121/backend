import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMapDto } from "src/dto/map-dto";
import { MapEntity } from "src/entity/map.entity";
import { Repository } from "typeorm";

@Injectable()
export class MapService {
    constructor(
        @InjectRepository(MapEntity)    
        private readonly mapRepo: Repository<MapEntity>, ) {}

    async createMap(mapDto: CreateMapDto): Promise<MapEntity> {    
        const {  name, floorNumber, roomNumber, buildingName} = mapDto;
        
        const buidlingInDb = await this.mapRepo.findOne({ 
            where: { name } 
        });

        if (buidlingInDb) {
            throw new HttpException('Map already exists', HttpStatus.BAD_REQUEST);    
        }
        
        const map: MapEntity = await this.mapRepo.create({ name, floorNumber, roomNumber, buildingName });
        await this.mapRepo.save(map);
        return map;  
    }

    async getAll(): Promise<MapEntity[]> {
        return this.mapRepo.find();
    }

    async getOne(id: string): Promise<MapEntity> {
        return this.mapRepo.findOneBy({ id });
    }

    async delete(id: string): Promise<void> {
        await this.mapRepo.delete({id});
    }

}