import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/modules/app.module';
import { json, urlencoded } from 'express';
import initSwagger from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSwagger(app);

  app.use(json({ limit: "10mb" }));
  app.use(urlencoded({ extended: true, limit: "10mb" }));

  app.enableCors({
    origin: "http://localhost:5173",
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
