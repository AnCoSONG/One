import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import * as mongoose from 'mongoose';
import { Article, ArticleSchema } from './schemas/article.schema';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(
          'mongodb://admin:admin2021@api.anco.fun/oneblog',
          {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true,
          },
        ),
        MongooseModule.forFeature([
          { name: Article.name, schema: ArticleSchema },
        ]),
      ],
      providers: [ArticleService],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll((done) => {
    mongoose.disconnect();
    done();
  });
});
