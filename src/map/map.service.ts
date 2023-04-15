import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMapDto } from "src/dto/map-dto";
import { MapEntity } from "src/entity/map.entity";
import { FilesService } from "src/file/file.service";
import { Repository } from "typeorm";

@Injectable()
export class MapService {
    constructor(
        @InjectRepository(MapEntity)    
        private readonly mapRepo: Repository<MapEntity>,
        private readonly filesService: FilesService ) {}

    async createMap(mapDto: CreateMapDto,  imageBuffer: Buffer, filename: string): Promise<MapEntity> {    
        const {  name, floorNumber, roomNumber, buildingName} = mapDto;
        
        const mapInDb = await this.mapRepo.findOne({ 
            where: { name } 
        });

        if (mapInDb) {
            throw new HttpException('Map already exists', HttpStatus.BAD_REQUEST);    
        }

        const map: MapEntity = await this.mapRepo.create({ name, floorNumber, roomNumber, buildingName});
        await this.mapRepo.save(map);
        const image = await this.filesService.uploadPublicFile(imageBuffer, filename);
        await this.mapRepo.update(map, {
            ...map,
            image
        });
        await this.mapRepo.save(map);
        return map;  
    }

    async getAll(): Promise<MapEntity[]> {
        return this.mapRepo.find();
    }

    async getOne(id: number): Promise<MapEntity> {
        return this.mapRepo.findOneBy({ id });
    }

    async delete(id: number): Promise<void> {
        const map = await this.mapRepo.findOneBy({ id });
        const fileId = map.image?.id;
        await this.mapRepo.delete({id});
        if (fileId) {
            await this.mapRepo.update(id, {
              ...map,
              image: null
            });
        }
        await this.filesService.deletePublicFile(fileId);
    }
}