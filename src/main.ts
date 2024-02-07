import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  /**
   * Initialize the Nest application.
   */
  const app = await NestFactory.create(AppModule);

  /**
   * Use the logger service to log messages to the console.
   */
  app.useLogger(app.get(Logger));

  /**
   * Get ConfigService from the app container to access the configuration values.
   */
  const configService = app.get(ConfigService);

  /**
   * Start the application on the specified port.
   */
  const port = configService.get('NEST_PORT');
  await app.listen(port);
}

/**
 * Run the application.
 */
bootstrap();
