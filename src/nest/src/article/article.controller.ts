import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('文章管理')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('all')
  @ApiOperation({ summary: '返回所有文章' })
  async findAll() {
    return await this.articleService.findAll();
  }
  @Get()
  async list(@Query('pageNo') pageNo = 1, @Query('pageSize') pageSize = 10) {
    return await this.articleService.list(Number(pageNo), Number(pageSize));
  }

  @Get(':id')
  @ApiOperation({ summary: '返回指定文章' })
  async find(@Param('id') id: string) {
    return await this.articleService.find(id);
  }

  @Post()
  @ApiOperation({ summary: '创建文章' })
  async create(@Body() createArticleDto: CreateArticleDto) {
    const result = { success: false, id: null, error_msg: null };
    try {
      const createRes = await this.articleService.create(createArticleDto);
      result.success = true;
      result.id = createRes._id;
    } catch (e) {
      console.error(e.message);
      result.error_msg = e.message;
    } finally {
      return result;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: '更新文章' })
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const result = { success: false, id: null, error_msg: null };
    try {
      const updateRes = await this.articleService.update(id, updateArticleDto);
      result.success = true;
      result.id = updateRes._id;
    } catch (e) {
      console.error(e.message);
      result.error_msg = e.message;
    } finally {
      return result;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除文章(上线后加验证)' })
  async remove(@Param('id') id: string) {
    const result = { success: false, id: null, error_msg: null };
    try {
      const removeRes = await this.articleService.remove(id);
      result.success = true;
      result.id = removeRes._id;
    } catch (e) {
      console.error(e.message);
      result.error_msg = e.message;
    } finally {
      return result;
    }
  }

  @Delete()
  @ApiOperation({ summary: '删除所有文章(上线后暂时关闭该接口)' })
  async removeAll() {
    return await this.articleService.removeAll();
  }
}
