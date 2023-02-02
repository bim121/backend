import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { secret } from "src/constant";
import { User, UserSchema } from "src/Schema/UserSchema.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        JwtModule.register({
            secret,
            signOptions: { expiresIn: '2h' },
          }),
          ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
          })
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule{

}