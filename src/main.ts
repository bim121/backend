import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';


const start = async() => {
    try{
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create(AppModule);

        const configer = new DocumentBuilder()
            .setTitle('backend')
            .setDescription('documentation REST API')
            .setVersion('1.0.0')
            .addTag('Pocket Buddy')
            .build()
        const document = SwaggerModule.createDocument(app, configer)
        SwaggerModule.setup('/api/docs', app, document)

        const configService = app.get(ConfigService);
        config.update({
            accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
            region: configService.get('AWS_REGION'),
        });

        app.enableCors();

        await app.listen(PORT, ()=>console.log(`Server started on PORT ${PORT}`));
    }catch (e){
        console.log(e);
    }
}

start();
