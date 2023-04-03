import { BuildingEntity } from "src/entity/building.entity";
import { CityEntity } from "src/entity/city.entity";
import { MapEntity } from "src/entity/map.entity";
import { UserEntity } from "../entity/user.entity";
import { RolesEntity } from "src/entity/roles.entity";
import { UserRolesEntity } from "src/entity/UserRoles.entity";

const entities = [UserEntity,BuildingEntity,MapEntity, CityEntity, RolesEntity, UserRolesEntity];

export {UserEntity, BuildingEntity, MapEntity, CityEntity, RolesEntity, UserRolesEntity};
export default entities;