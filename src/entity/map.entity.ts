import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BuildingEntity } from './building.entity';
import { ApiProperty } from '@nestjs/swagger';
import PublicFile from './publicFile.entity';

@Entity('map')
export class MapEntity {  
    @ApiProperty({example: '1', description: 'Уникальный индетификатор'})
    @PrimaryGeneratedColumn() public id: number;
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
    @JoinColumn()
    @OneToOne(
    () => PublicFile,
    {
      eager: true,
      nullable: true
    })
    public image?: PublicFile;
    @ManyToOne(type => BuildingEntity, building => building.maps)
    building: BuildingEntity;
}