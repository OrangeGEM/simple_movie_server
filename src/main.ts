if(!process.env.IS_TS_NODE) {
  require('module-alias/register')
}

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Simple-Movies API')
    .setDescription('The Simple-Movies API description')
    .setVersion('1.0')
    .addTag('User')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if (!process.env['GET_TOKEN_URL'] || !process.env['PASSWORD_HASH_SALT'])
    throw new Error('Shit happened, cannot find token url or salt in environment');

  await app.listen(3001);
}
bootstrap();
