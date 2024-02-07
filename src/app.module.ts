import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { MongooseModule } from '@nestjs/mongoose';
import { loggerOptions } from './logger/logger.options';
import { configOptions } from './config/config.options';
import { mongooseOptions } from './mongoose/moongose.options';
import { MeasurementModule } from './measurements/measurement.module';

@Module({
  imports: [
    MeasurementModule,
    LoggerModule.forRoot(loggerOptions),
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync(mongooseOptions),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
