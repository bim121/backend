import { Module } from "@nestjs/common";
import { MapModule } from "./map/map.module";
import { CityModule } from "./city/city.module";
import { BuildingModule } from "./building/building.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AuthModule } from "./Auth/auth.module";
import * as path from 'path'
import { ConfigModule } from "@nestjs/config";
import * as Joi from '@hapi/joi'
import { DatabaseModule } from "./database/database.module";
import { FilesModule } from "./file/file.module";
import { CountryModule } from "./country/country.module";
import { ChatModule } from "./Gateway/chat.module";
import { SearchModule } from "./search/search.module";

@Module({
    imports: [
      ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true
      }),
      ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
      ConfigModule.forRoot({
        validationSchema: Joi.object({
          POSTGRES_HOST: Joi.string().required(),
          POSTGRES_PORT: Joi.number().required(),
          POSTGRES_USER: Joi.string().required(),
          POSTGRES_PASSWORD: Joi.string().required(),
          POSTGRES_DB: Joi.string().required(),
          PORT: Joi.number(),
          AWS_REGION: Joi.string().required(),
          AWS_ACCESS_KEY_ID: Joi.string().required(),
          AWS_SECRET_ACCESS_KEY: Joi.string().required(),
          AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
          WEBHOOK_URL: Joi.string().required(),
          JWT_SECRET: Joi.string().required(),
          JWT_EXPIRATION_TIME: Joi.string().required(),
          RABBITMQ_USER: Joi.string().required(),
          RABBITMQ_PASSWORD: Joi.string().required(),
          RABBITMQ_HOST: Joi.string().required(),
          RABBITMQ_QUEUE_NAME: Joi.string().required(),
          ELASTICSEARCH_NODE: Joi.string().required(),
          ELASTICSEARCH_USERNAME: Joi.string().required(),
          ELASTICSEARCH_PASSWORD: Joi.string().required(),
        })
      }),
        DatabaseModule,
        SearchModule,
        AuthModule,
        MapModule,
        CityModule,
        FilesModule,
        CountryModule,
        BuildingModule,
        ChatModule
      ]
})
export class AppModule{

}