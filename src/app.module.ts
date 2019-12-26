import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IdeaModule } from './idea/idea.module';
import { IdeaEntity } from './idea/idea.entity';
import { Config } from './config/Config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: Config.DB_USERNAME,
      password: Config.DB_PASSWORD,
      database: Config.DB_DATABASE,
      synchronize: true,
      logging: true,
      entities: [IdeaEntity],
    }),
    IdeaModule,
  ],
})
export class AppModule {}
