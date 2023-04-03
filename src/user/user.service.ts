import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from '../entity/user.entity';
import { UserDto } from "src/dto/user/user-dto";
import { toUserDto } from "src/shared/mapper";
import { LoginUserDto } from "src/dto/user/user-login-dto";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "src/dto/user/user-create-dto";
import { JwtPayload } from "src/Auth/jwt.strategy";
import { RolesService } from "src/Roles/roles.services";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)    
        private readonly userRepo: Repository<UserEntity>,
        private roleService: RolesService ) {}
    
    async findOne(options?: object): Promise<UserDto> {
        const user =  await this.userRepo.findOne(options);    
        return toUserDto(user);  
    }
   
    async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {    
        const user = await this.userRepo.findOne({ where: { username } });
        
        if (!user) {
            throw new HttpException('User not found',  HttpStatus.UNAUTHORIZED);    
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
        }
        
        return toUserDto(user);  
    }

    async findByPayload({ username }: JwtPayload): Promise<UserDto> { 
        return await this.findOne({ 
            where:  { username } });  
    }

    async create(userDto: CreateUserDto): Promise<UserDto> {    
        const { username, password, email } = userDto;
        
        const userInDb = await this.userRepo.findOne({ 
            where: { username } 
        });
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST); //refactor exception   
        }
        
        
        const user: UserEntity = await this.userRepo.create({ username, password, email, });
        const role = await this.roleService.getRoleByValue("USER");
        user.roles.push(role)
        await this.userRepo.save(user);
        return toUserDto(user);  
    }
}