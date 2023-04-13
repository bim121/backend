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
        nullable: false, 
        unique: true 
    }) 
    countryName: string;
    @ApiProperty({example: 'Ukraine is a center of Europe', description: 'Опис міста'})
    @Column({ 
        type: 'varchar', 
        nullable: false 
    }) 
    description: string;
    @OneToMany( type => CityEntity , city => city.country)
    cities: Array<CityEntity>;
    
}