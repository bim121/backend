import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('roles')
export class RolesEntity {  
    @ApiProperty({example: '1', description: 'Уникальный индетификатор'})
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @ApiProperty({example: 'ADMIN', description: 'Унікальне значення ролі'})
    @Column({ 
        type: 'varchar', 
        nullable: false, 
        unique: true 
    }) 
    value: string;
   
    @ApiProperty({example: 'Administrator', description: 'Опис ролі'})
    @Column({ 
        type: 'varchar', 
        nullable: false, 
    }) 
    description: string;

    @ManyToMany(() => UserEntity, user => user.roles,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    users?: UserEntity;
}