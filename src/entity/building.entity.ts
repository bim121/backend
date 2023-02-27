import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';
import { MapEntity } from './map.entity';

@Entity('building')
export class BuildingEntity {  
    @PrimaryGeneratedColumn('uuid') id: string;  
    @Column({ 
        type: 'varchar', 
        nullable: false, 
        unique: true 
    }) 
    buildingName: string;
    @Column({ 
        type: 'varchar', 
        nullable: false 
    }) 
    description: string;  @Column({ 
        type: 'varchar', 
        nullable: false 
    })  
    streetName: string;
    @OneToMany( type => MapEntity , map => map.building)
    maps: Array<MapEntity>;
}