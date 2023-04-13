import { BuildingEntity } from "src/entity/building.entity";
import { CityEntity } from "src/entity/city.entity";
import { MapEntity } from "src/entity/map.entity";
import { UserEntity } from "../entity/user.entity";
import { RolesEntity } from "src/entity/roles.entity";
import { UserRolesEntity } from "src/entity/UserRoles.entity";
import { CountryEntity } from "src/entity/сountry.entity";

const entities = [UserEntity,BuildingEntity,MapEntity, CityEntity, RolesEntity, UserRolesEntity, CountryEntity];

export {UserEntity, BuildingEntity, MapEntity, CityEntity, RolesEntity, UserRolesEntity, CountryEntity};
export default entities;