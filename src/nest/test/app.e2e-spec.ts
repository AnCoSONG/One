import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ArticleModule } from './../src/article/article.module';
import * as mongoose from 'mongoose';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ArticleModule],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/article (GET)', () => {
    return request(app.getHttpServer()).get('/article').expect(200);
  });

  it('/article/all (GET)', () => {
    return request(app.getHttpServer()).get('/article/all').expect(200);
  });

  afterAll((done) => {
    mongoose.disconnect(); //! must disconnet the connection to solve `jest did not exit one second after...`
    done();
  });
});
