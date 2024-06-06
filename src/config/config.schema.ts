import * as Joi from 'joi';

export const configSchema = Joi.object({
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  PORT: Joi.number().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  ADMINISTRATOR_PASSWORD: Joi.string().required(),
  ADMINISTRATOR_USERNAME: Joi.string().required(),
  ADMINISTRATOR_EMAIL: Joi.string().required(),
  SUPABASE_URL: Joi.string().required(),
  SUPABASE_KEY: Joi.string().required(),
  CLOUD_NAME: Joi.string().required(),
  CLOUDINARY_KEY: Joi.string().required(),
  CLOUDINARY_SECRET: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
