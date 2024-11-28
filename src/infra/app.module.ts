import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    }),
    DatabaseModule,
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
