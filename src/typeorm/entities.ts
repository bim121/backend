import { BuildingEntity } from "src/entity/building.entity";
import { CityEntity } from "src/entity/city.entity";
import { MapEntity } from "src/entity/map.entity";
import { UserEntity } from "../entity/user.entity";

const entities = [UserEntity,BuildingEntity,MapEntity, CityEntity];

export {UserEntity, BuildingEntity, MapEntity, CityEntity};
export default entities;