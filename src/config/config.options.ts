import { configLoader } from './config.loader';
import { configSchema } from './config.schema';

export const configOptions = {
  load: configLoader,
  validationSchema: configSchema,
};
