import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRoleDto } from "src/dto/role-create-dto";
import { RolesEntity } from "src/entity/roles.entity";
import { Repository } from "typeorm";

@Injectable()
export class RolesService {

    constructor( @InjectRepository(RolesEntity)  private readonly roleRepo: Repository<RolesEntity>,) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepo.create(dto);
        await this.roleRepo.save(role);
        return role;
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepo.findOne({where: {value}})
        return role;
    }

}