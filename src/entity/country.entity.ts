import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';
import { CityEntity } from './city.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('country')
export class CountryEntity {  
    @ApiProperty({example: '1', description: 'Уникальный индетификатор'})
    @PrimaryGeneratedColumn('uuid') id: string;  
    @ApiProperty({example: 'Ukraine', description: 'Назва країни'})
    @Column({ 
        type: 'varchar', 
    }) 
    countryName: string;
    @ApiProperty({example: 'Ukraine it is country which named heart of Europe', description: 'Опис країни'})
    @Column({ 
        type: 'varchar', 
    }) 
    description: string;
    @ApiProperty({example: 'Ukraine is a center of Europe', description: 'Локація міста'})
    @Column({ 
        type: 'varchar', 
    }) 
    location: string;
    @OneToMany( type => CityEntity , city => city.country)
    cities: Array<CityEntity>;
    
}