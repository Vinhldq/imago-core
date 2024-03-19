import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as assmin from 'firebase-admin';

async function bootstrap() {
  const serviceAccount = require('../config/imago-core-offical-admin-key.json');
  // const serviceAccount = require('../config/admin-key.json');
  assmin.initializeApp({
    credential: assmin.credential.cert(serviceAccount),
  });
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}

bootstrap().then();
