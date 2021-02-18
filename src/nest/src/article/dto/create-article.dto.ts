import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ description: '标题', default: 'Lorem' })
  title: string;
  @ApiProperty({ description: '日期', default: 'Feburary 14, 2021' })
  date: string;
  @ApiProperty({ description: '作者', default: 'Jinyu SONG' })
  author: string;
  @ApiProperty({ description: '前言', default: 'This is a preface.' })
  preface: string;
  @ApiProperty({
    description: '内容',
    default: `# This is a content.\n ## This is second level title.\n> This is quote.\n
    \`\`\`js
    This is code.
    \`\`\`
    This is formula: $\\frac{a}{b}$.
    `,
  })
  content: string;
}
