import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ManyToOne } from 'typeorm';
import { BuildingEntity } from './building.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('map')
export class MapEntity {  
    @ApiProperty({example: '1', description: 'Уникальный индетификатор'})
    @PrimaryGeneratedColumn('uuid') id: string;  
    @ApiProperty({example: 'main', description: 'Назва карти'})
    @Column({ 
        type: 'varchar', 
        nullable: false, 
        unique: true 
    }) 
    name: string;
    @ApiProperty({example: '1', description: 'Поверх будівлі'})
    @Column({ 
        type: 'integer', 
        nullable: false 
    }) 
    floorNumber: number; 
    @Column({ 
        type: 'varchar', 
        nullable: false 
    })  
    @ApiProperty({example: '1/3', description: 'Номер кімнати'})
    roomNumber: string;
    @Column({ 
        type: 'varchar', 
        nullable: false 
    })  
    buildingName: string;
    @ApiProperty({example: 'CityCenter', description: 'Назва будівлі'})
    @Column({ 
        type: 'varchar', 
        nullable: false 
    })  
    @ApiProperty({example: 'audio/sdfds3234dg.png', description: 'зображення карти'})
    picturePath: string;
    @ManyToOne(type => BuildingEntity, building => building.maps)
    building: BuildingEntity;
}