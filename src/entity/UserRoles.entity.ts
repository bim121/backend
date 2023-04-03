import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ManyToMany, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { RolesEntity } from './roles.entity';
import { UserEntity } from './user.entity';

@Entity('userRoles')
export class UserRolesEntity {  

    @ApiProperty({example: '1', description: 'Уникальный индетификатор'})
    @PrimaryColumn({ name: 'role_id' })
    roleId: number;
  
    @PrimaryColumn({ name: 'user_id' })
    userId: number;
    
    @ManyToOne(
        () => UserEntity,
        user => user.roles,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
      )
      @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
      users: UserEntity[];
    
      @ManyToOne(
        () => RolesEntity,
        role => role.users,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
      )
      @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
      roles: RolesEntity[];
}