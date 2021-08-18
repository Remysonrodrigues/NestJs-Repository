import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';
import 'dotenv/config';

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { logger });
  await app.listen(Number(process.env.PORT) || 3000);
  Logger.log(`Server started running on http://localhost:${Number(process.env.PORT)}`, 'Bootstrap');
}
bootstrap();
