import { NestFactory } from '@nestjs/core';
import { AppModule } from 'modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
