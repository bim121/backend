import { Injectable, HttpException, HttpStatus, ForbiddenException, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMapDto } from "src/dto/map-dto";
import { HttpService } from '@nestjs/axios';
import { MapEntity } from "src/entity/map.entity";
import { Repository } from "typeorm";
import { map, catchError, lastValueFrom } from 'rxjs';
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class MapService {
    constructor(
        @InjectRepository(MapEntity)    
        private readonly mapRepo: Repository<MapEntity>,
        @Inject('FILES_SERVICE') private filesService: ClientProxy,
        private readonly httpService: HttpService ) {}

    async createMap(mapDto: CreateMapDto,  imageBuffer: Buffer, filename: string): Promise<MapEntity> {    
        const {  name, floorNumber, roomNumber, buildingName} = mapDto;
        
        const mapInDb = await this.mapRepo.findOne({ 
            where: { name } 
        });

        if (mapInDb) {
            throw new HttpException('Map already exists', HttpStatus.BAD_REQUEST);    
        }

        const mapObject: MapEntity = await this.mapRepo.create({ name, floorNumber, roomNumber, buildingName});
        await this.mapRepo.save(mapObject);

        const json = JSON.stringify({
            buffer: imageBuffer.toString('base64')
          });

        const image = await this.filesService.send({
            cmd: 'upload-files'
          }, {json, filename}).toPromise();

        if(!image){
            throw new HttpException('Bad exception for rabbitmq', HttpStatus.BAD_REQUEST); 
        }

        

        await this.mapRepo.update(mapObject, {
            ...map,
            image
        });
        await this.mapRepo.save(mapObject);

        const request = this.httpService.post('https://webhook.site/575fcb15-6763-47ca-b875-0d419d7117aa', {
            data: mapObject,
            event: "map.created"
        })
        .pipe(
            catchError(() => {
            throw new ForbiddenException('API not available');
            }),
        );

    //     const request = this.httpService
    //     .get('http://localhost:3000')
    //     .pipe(map((res) => res.data))
    //     .pipe(
    //     catchError(() => {
    //         throw new ForbiddenException('API not available');
    //    }),
    //  );

     const fact = await lastValueFrom(request);
     return mapObject;  
    }

    async getAll(): Promise<MapEntity[]> {
        return this.mapRepo.find();
    }

    async getOne(id: number): Promise<MapEntity> {
        return this.mapRepo.findOneBy({ id });
    }

    async delete(id: number): Promise<void> {
        this.mapRepo.delete({ id });
    }
}