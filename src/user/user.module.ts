import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { UserService } from './user.service';
import { RolesModule } from 'src/Roles/roles.module';
import { RolesService } from 'src/Roles/roles.services';

@Module({
  imports: [
      TypeOrmModule.forFeature([UserEntity]),
      RolesModule
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}