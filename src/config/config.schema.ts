import * as Joi from 'joi';

export const configSchema = Joi.object({
  NEST_PORT: Joi.string().default(3000),
  NODE_ENV: Joi.string().default('development'),
  MONGO_URI: Joi.string().required(),
});
