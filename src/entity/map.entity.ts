import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ManyToOne } from 'typeorm';
import { BuildingEntity } from './building.entity';

@Entity('map')
export class MapEntity {  
    @PrimaryGeneratedColumn('uuid') id: string;  
    @Column({ 
        type: 'varchar', 
        nullable: false, 
        unique: true 
    }) 
    name: string;
    @Column({ 
        type: 'integer', 
        nullable: false 
    }) 
    floorNumber: number; 
    @Column({ 
        type: 'varchar', 
        nullable: false 
    })  
    roomNumber: string;
    @Column({ 
        type: 'varchar', 
        nullable: false 
    })  
    buildingName: string;
    @Column({ 
        type: 'varchar', 
        nullable: false 
    })  
    picturePath: string;
    @ManyToOne(type => BuildingEntity, building => building.maps)
    building: BuildingEntity;
}