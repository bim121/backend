import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';
import { BuildingEntity } from './building.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('city')
export class CityEntity {  
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
    @Column({ 
        type: 'varchar', 
        nullable: false 
    })  
    @ApiProperty({example: 'Odessa', description: 'Назва міста'})
    cityName: string;
    @OneToMany( type => BuildingEntity , building => building.city)
    buildings: Array<BuildingEntity>;
    
}