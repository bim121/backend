import {Module} from '@nestjs/common';
import {RolesController} from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from 'src/entity/roles.entity';
import { UserEntity } from 'src/entity/user.entity';
import { UserRolesEntity } from 'src/entity/UserRoles.entity';
import { RolesService } from './roles.services';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    TypeOrmModule.forFeature([RolesEntity, UserEntity, UserRolesEntity]),
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}