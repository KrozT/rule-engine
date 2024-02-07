import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const mongooseOptions: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const mongoUri = configService.get('MONGO_URI');
    return {
      uri: mongoUri,
    };
  },
  inject: [ConfigService],
};
