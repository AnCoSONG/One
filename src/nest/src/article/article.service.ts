import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticleService {
  // 引入mongodb数据库
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<ArticleDocument> {
    return await this.articleModel.create(createArticleDto);
  }
  async findAll(): Promise<ArticleDocument[]> {
    return this.articleModel.find().exec();
  }
  async find(id): Promise<ArticleDocument> {
    return this.articleModel.findById(id).exec();
  }
  async list(pageNo: number, pageSize: number): Promise<any> {
    const data = await this.articleModel
      .find({}, 'title author date preface')
      .sort({ _id: 'desc' })
      .skip(Math.max(0, pageNo - 1) * pageSize)
      .limit(pageSize);
    const total = await this.articleModel.estimatedDocumentCount().exec();
    // console.log(data, total);
    return { pageNo, pageSize, total, data };
  }
  async remove(id): Promise<Partial<ArticleDocument>> {
    const { _id } = await this.articleModel.findByIdAndDelete(id).exec();
    return { _id };
  }

  async update(id, body: UpdateArticleDto): Promise<ArticleDocument> {
    return await this.articleModel.findByIdAndUpdate(id, body).exec();
  }

  async removeAll(): Promise<ArticleDocument> {
    return await this.articleModel.deleteMany();
  }
}
