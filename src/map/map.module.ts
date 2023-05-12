import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MapEntity } from "src/entity/map.entity";
import { MapController } from "./map.controller";
import { MapService } from "./map.service";
import { FilesModule } from "src/file/file.module";
import { HttpModule } from "@nestjs/axios";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
    imports: [
        TypeOrmModule.forFeature([MapEntity]),
        FilesModule,
        HttpModule,
        ClientsModule.register([
            {
              name: 'FILES_SERVICE',
              transport: Transport.RMQ,
              options: {
                urls: [`amqp://guest:guest@rabbitmq:5672`],
                queue: 'files',
                queueOptions: {
                    durable: true,
                },
              },
            },
          ])
    ],
    controllers: [MapController],
    providers: [MapService],
    exports: [MapService]
})
export class MapModule{
    
}