import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // retira tudo que não está mapeado no dto do objeto que estamos recebendo
      forbidNonWhitelisted: true, //da erro na requisicao quando tiver mais infos no objeto que não estão mapeados no dto
      transform: true, // tipa o objeto com o dto
    }),
  );
  await app.listen(3000);
}
bootstrap();
