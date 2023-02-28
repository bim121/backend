import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMapDto } from "src/dto/map-dto";
import { MapEntity } from "src/entity/map.entity";
import { FileService, FileType } from "src/file/file.service";
import { Repository } from "typeorm";

@Injectable()
export class MapService {
    constructor(
        @InjectRepository(MapEntity)    
        private readonly mapRepo: Repository<MapEntity>,
        private fileService: FileService ) {}

    async createMap(mapDto: CreateMapDto, picture): Promise<MapEntity> {    
        const {  name, floorNumber, roomNumber, buildingName} = mapDto;
        
        const mapInDb = await this.mapRepo.findOne({ 
            where: { name } 
        });

        if (mapInDb) {
            throw new HttpException('Map already exists', HttpStatus.BAD_REQUEST);    
        }
        
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

        const map: MapEntity = await this.mapRepo.create({ name, floorNumber, roomNumber, buildingName, picturePath  });
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