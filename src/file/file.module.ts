import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import PublicFile from "src/entity/publicFile.entity";
import { FilesService } from "./file.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([PublicFile]),
    ],
    providers: [FilesService],
    exports: [FilesService]
})
export class FilesModule{
    
}