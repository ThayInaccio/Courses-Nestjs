import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    CoursesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'cursonestjs',
      entities: [__dirname + '/**/*.entity.js'],
      autoLoadEntities: true,
      synchronize: false, //usar apenas em dev
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
