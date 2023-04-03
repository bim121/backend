import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, ManyToOne } from 'typeorm';
import { CityEntity } from './city.entity';
import { MapEntity } from './map.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('building')
export class BuildingEntity {  
    @ApiProperty({example: '1', description: 'Уникальный индетификатор'})
    @PrimaryGeneratedColumn('uuid') id: string;  
    @Column({ 
        type: 'varchar', 
        nullable: false, 
        unique: true 
    }) 
    buildingName: string;
    @ApiProperty({example: 'CityCenter', description: 'Название будівлі'})
    @Column({ 
        type: 'varchar', 
        nullable: false 
    }) 
    description: string;  
    @ApiProperty({example: 'town on the south of Ukraine', description: 'Опис міста'})
    @Column({ 
        type: 'varchar', 
        nullable: false 
    })  
    streetName: string;
    @ApiProperty({example: 'NovaMorska', description: 'Назва вулиці'})
    @Column({ 
        type: 'varchar', 
        nullable: false 
    })  

    cityName: string;
    @ApiProperty({example: 'Odessa', description: 'Назва міста'})
    @OneToMany( type => MapEntity , map => map.building)
    maps: Array<MapEntity>;
    @ManyToOne(type => CityEntity, city => city.buildings)
    city: CityEntity;
}