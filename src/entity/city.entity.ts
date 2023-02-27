import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';
import { BuildingEntity } from './building.entity';

@Entity('city')
export class CityEntity {  
    @PrimaryGeneratedColumn('uuid') id: string;  
    @Column({ 
        type: 'varchar', 
        nullable: false, 
        unique: true 
    }) 
    countryName: string;
    @Column({ 
        type: 'varchar', 
        nullable: false 
    }) 
    description: string;
    @Column({ 
        type: 'varchar', 
        nullable: false 
    })  
    cityName: string;
    @OneToMany( type => BuildingEntity , building => building.city)
    buildings: Array<BuildingEntity>;
    
}