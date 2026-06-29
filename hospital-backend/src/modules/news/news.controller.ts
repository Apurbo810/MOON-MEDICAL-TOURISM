import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Query,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';

import { NewsService } from './news.service';

import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result: any =
      await this.cloudinaryService.uploadFile(
        file,
      );

    return {
      imageUrl: result.secure_url,
      publicId: result.public_id,
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createNewsDto: CreateNewsDto,
  ) {
    return this.newsService.create(
      createNewsDto,
    );
  }

    @Get()
    findAll(@Query() query: any) {
    return this.newsService.findAll(query);
    }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateNewsDto: UpdateNewsDto,
  ) {
    return this.newsService.update(
      id,
      updateNewsDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}