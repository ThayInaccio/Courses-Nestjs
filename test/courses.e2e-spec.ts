import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CoursesModule } from './../src/courses/courses.module';
import { CreateCourseDto } from './../src/courses/dto/create-course.dto';

describe('Courses: /courses', () => {
  let app: INestApplication;

  const course: CreateCourseDto = {
      name: 'Nestjs com TypeOrm',
      description: 'Criando apis restful com nestjs',
      tags: ['nestjs', 'typeorm', 'nodejs', 'typescript']
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoursesModule, TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'docker',
        database: 'testdb',
        autoLoadEntities: true,
        synchronize: true,
      })],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true, // retira tudo que não está mapeado no dto do objeto que estamos recebendo
          forbidNonWhitelisted: true, //da erro na requisicao quando tiver mais infos no objeto que não estão mapeados no dto
          transform: true, // tipa o objeto com o dto
        }),
      );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Create POST / courses', () => {
    return request(app.getHttpServer())
    .post('/courses')
    .send(course)
    .expect(HttpStatus.CREATED)
    .then(({body}) => {
        const expectdCourse = jasmine.objectContaining({
          ...course,
          tags: jasmine.arrayContaining(
            course.tags.map(
              name => jasmine.objectContaining({name})
            )
          )
        })
        expect(body).toEqual(expectdCourse)
      })
  });
});
