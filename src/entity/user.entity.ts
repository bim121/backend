import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import Role from '../enum/role.enum';

@Entity('user')
export class UserEntity {  
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;
    @ApiProperty({example: '1', description: 'Уникальный индетификатор'})
    @Column({ 
        type: 'varchar',  
        unique: true 
    }) 
    username: string;
    @ApiProperty({example: 'bim', description: "Ім'я користувача"})
    @Column({ 
        type: 'varchar', 
    }) 
    @ApiProperty({example: '1fdg4', description: 'Пароль користувача'})
    password: string;  
    @Column({ 
        type: 'varchar', 
    }) 
    @ApiProperty({example: 'dgfdg@gmail.com', description: 'Емеіл користувача'}) 
    email: string;
    @Column({
      type: 'enum',
      enum: Role,
      default: [Role.User]
    })
    public roles: Role[]
    
    @BeforeInsert()  async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }
}