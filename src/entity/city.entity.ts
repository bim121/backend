import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, ManyToOne } from 'typeorm';
import { BuildingEntity } from './building.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CountryEntity } from './country.entity';

@Entity('city')
export class CityEntity {  
    @ApiProperty({example: '1', description: 'Уникальный индетификатор'})
    @PrimaryGeneratedColumn('uuid') id: string;  
    @ApiProperty({example: 'Ukraine', description: 'Назва країни'})
    @Column({ 
        type: 'varchar', 
    }) 
    countryName: string;
    @ApiProperty({example: 'Odessa is a touristic city', description: 'Опис міста'})
    @Column({ 
        type: 'varchar', 
    }) 
    description: string;
    @Column({ 
        type: 'varchar', 
    })  
    @ApiProperty({example: 'Odessa', description: 'Назва міста'})
    cityName: string;
    @OneToMany( type => BuildingEntity , building => building.city)
    buildings: Array<BuildingEntity>;
    @ManyToOne(type => CountryEntity, country => country.cities)
    country: CountryEntity;
}