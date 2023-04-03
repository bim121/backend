import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class UserEntity {  
    @PrimaryGeneratedColumn('uuid') id: string;  
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
}