import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


export default function initSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('SafeMeetings API')
        .setDescription('A complete API documentation for SafeMeetings application')
        .setVersion('1.0')
        .addTag('SafeMeetings')
        .build();
    
    const document = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}