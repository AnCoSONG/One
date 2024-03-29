import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;
@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  preface: string;

  @Prop({ required: true })
  content: string;
}
export const ArticleSchema = SchemaFactory.createForClass(Article);
