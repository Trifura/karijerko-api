import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useNestTreblle } from 'treblle';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
  });
  await app.listen(3000);

  const expressInstance = app.getHttpAdapter().getInstance();

  useNestTreblle(expressInstance, {
    apiKey: 'Zp1Enon4g4BR3ZpIBYzGyfQGsdVnzxsXNuZM6bFyZestWvSQPEnU8tQ49rplalQh',
    projectId: '01j3jsp7c86hbk1axjsbzxb2wp',
  });
}

bootstrap();
