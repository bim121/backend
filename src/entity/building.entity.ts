import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, ManyToOne } from 'typeorm';
import { CityEntity } from './city.entity';
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
    @Column({ 
        type: 'varchar', 
        nullable: false 
    })  
    cityName: string;
    @OneToMany( type => MapEntity , map => map.building)
    maps: Array<MapEntity>;
    @ManyToOne(type => CityEntity, city => city.buildings)
    city: CityEntity;
}