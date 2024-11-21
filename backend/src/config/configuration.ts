import * as Joi from 'joi';
import 'dotenv/config';

interface EnvVariables {
  APP_NAME: string;
  APP_PORT: number;
  APP_DEFAULT_VER: string;
  APP_URL: string;

  DATABASE_URL: string;

  JWT_SECRET: string;
  JWT_DURATION: string;
}

const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  APP_NAME: Joi.string().default('Localhost Api'),
  APP_PORT: Joi.number().default(3000),
  APP_URL: Joi.string().default('http://localhost:3000'),
  APP_DEFAULT_VER: Joi.string().default('1'),
  DATABASE_URL: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().min(8).required(),
  JWT_DURATION: Joi.string().default('1d'),
}).unknown(true);

const { error, value } = envValidationSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVariables = value;

export const envs = {
  app: {
    name: envVars.APP_NAME,
    port: envVars.APP_PORT,
    url: envVars.APP_URL,
    defaultVer: envVars.APP_DEFAULT_VER,
  },
  database: {
    url: envVars.DATABASE_URL,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    duration: envVars.JWT_DURATION,
  },
};
