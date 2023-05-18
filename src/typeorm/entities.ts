import { BuildingEntity } from "src/entity/building.entity";
import { CityEntity } from "src/entity/city.entity";
import { MapEntity } from "src/entity/map.entity";
import { UserEntity } from "../entity/user.entity";
import { CountryEntity } from "src/entity/country.entity";
import PublicFile from "src/entity/publicFile.entity";
import MessageEntity from "src/entity/message.entity";

const entities = [UserEntity,BuildingEntity,MapEntity, CityEntity, CountryEntity, PublicFile, MessageEntity];

export {UserEntity, BuildingEntity, MapEntity, CityEntity, CountryEntity, PublicFile, MessageEntity};
export default entities;