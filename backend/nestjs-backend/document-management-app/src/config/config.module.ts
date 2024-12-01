import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config';
import { ConfigServiceWrapper } from './config.service';
import * as Joi from 'joi';  // Joi is used for validating the environment variables

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [() => ({})],  // You can add a custom loading function if needed
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        PYTHON_BACKEND_URL: Joi.string().uri().required(),
        DATABASE_URL: Joi.string().uri().required(),
        JWT_SECRET: Joi.string().required(),
        NODE_ENV: Joi.string().valid('development', 'production').default('development'),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      isGlobal: true,  // Makes the ConfigModule globally available across the app
    }),
  ],
  providers: [ConfigServiceWrapper],
  exports: [ConfigServiceWrapper],
})
export class ConfigModule {}
