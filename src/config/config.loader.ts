import { ConfigFactory } from '@nestjs/config';

export const configLoader: Array<ConfigFactory> = [
  () => ({
    environment: process.env.NODE_ENV || 'development',
    nest: {
      port: parseInt(process.env.PORT, 10) || 3000,
    },
    mongo: {
      uri: process.env.MONGO_URI,
    },
  }),
];
