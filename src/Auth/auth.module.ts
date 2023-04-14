import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { secret } from "src/constant";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entity/user.entity";

@Module({  
    imports: [   
        TypeOrmModule.forFeature([UserEntity]), 
        UserModule,    
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.register({
            secret: secret, signOptions: {
                expiresIn: '1800s',
            },
        }),
    ], 
    controllers: [AuthController],  
    providers: [AuthService, JwtStrategy],  
    exports: [
        PassportModule, 
        JwtModule,
        AuthService
    ],
})
export class AuthModule {}