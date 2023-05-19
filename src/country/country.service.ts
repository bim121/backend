import { Injectable, HttpException, HttpStatus, UseGuards } from "@nestjs/common";;
import { InjectRepository } from "@nestjs/typeorm";
import { ChatGateway } from "src/Gateway/chat.gateway";
import { BuildingService } from "src/building/building.service";
import { CityService } from "src/city/city.service";
import { CreateCityDto } from "src/dto/city-dto";
import { CreateCountryDto } from "src/dto/country-dto";
import { CityEntity } from "src/entity/city.entity";
import { CountryEntity } from "src/entity/country.entity";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class CountryService {
    constructor(
        @InjectRepository(CityEntity) private readonly cityRepo: Repository<CityEntity>, 
        @InjectRepository(CountryEntity) private readonly countryRepo: Repository<CountryEntity>, 
         private readonly buildingService: BuildingService, 
        private readonly cityService: CityService,
        private readonly chatGateway: ChatGateway) {}

    async createCountry(countryDto: CreateCountryDto): Promise<CreateCountryDto> {    
        const { description, countryName, location } = countryDto;

        const countryInDb = await this.countryRepo.findOne({ 
            where: { countryName } 
        });

        if (countryInDb ) {
            throw new HttpException('coutry already exists', HttpStatus.BAD_REQUEST);    
        }
        
        const country: CountryEntity = await this.countryRepo.create({ description, countryName, location });
        await this.countryRepo.save(country);
        this.chatGateway.sendInfo("country with name: " + countryName + ", location: " + location + " and description: " + description);
        return country;  
    }

    async getAll(): Promise<CountryEntity[]> {
        return this.countryRepo.find();
    }

    async addCity(dto: CreateCityDto): Promise<CountryEntity> {
        const city = await this.cityService.createCity(dto);
        const countryName =  city.countryName;
        const country = await this.countryRepo.findOne( {where: { countryName} });
        city.country = country;
        this.cityRepo.save(city);
        return country;
    }

    async getOne(id: string): Promise<CountryEntity> {
        
        return await this.countryRepo.findOne({
            where: {
                id
            },
            relations: {
                cities: true,
            },
        })
    }

    async delete(id: string): Promise<void> {
        await this.countryRepo.delete({id});
    }

}