import { ApiProperty } from '@nestjs/swagger';

export class UpdateArticleDto {
  @ApiProperty({ description: '标题', required: false })
  title?: string;
  @ApiProperty({ description: '作者', required: false })
  author?: string;
  @ApiProperty({ description: '日期', required: false })
  date?: string;
  @ApiProperty({ description: '前言', required: false })
  preface?: string;
  @ApiProperty({
    description: '内容',
    required: false,
  })
  content?: string;
}
