import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ManyToMany, JoinTable } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { RolesEntity } from './roles.entity';

@Entity('user')
export class UserEntity {  
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;
    @ApiProperty({example: '1', description: 'Уникальный индетификатор'})
    @Column({ 
        type: 'varchar', 
        nullable: false, 
        unique: true 
    }) 
    username: string;
    @ApiProperty({example: 'bim', description: "Ім'я користувача"})
    @Column({ 
        type: 'varchar', 
        nullable: false 
    }) 
    @ApiProperty({example: '1fdg4', description: 'Пароль користувача'})
    password: string;  
    @Column({ 
        type: 'varchar', 
        nullable: false 
    }) 
    @ApiProperty({example: 'dgfdg@gmail.com', description: 'Емеіл користувача'}) 
    email: string;
    
    @BeforeInsert()  async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }

    @ManyToMany(
        () => RolesEntity,
        role => role.users,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION',},
      )
      @JoinTable({
        name: 'user_role',
        joinColumn: {
          name: 'user_id',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'role_id',
          referencedColumnName: 'id',
        },
      })
      roles?: RolesEntity[];
}