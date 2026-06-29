import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';

import {
  News,
  NewsDocument,
} from './schemas/news.schema';

import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name)
    private newsModel: Model<NewsDocument>,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createNewsDto: CreateNewsDto) {
    return this.newsModel.create(createNewsDto);
  }

    async findAll(query: any) {
    const filter: any = {};

    if (query.search) {
        filter.title = {
        $regex: query.search,
        $options: 'i',
        };
    }

    if (query.isPublished !== undefined) {
        filter.isPublished =
        query.isPublished === 'true';
    }

    return this.newsModel
        .find(filter)
        .sort({
        createdAt: -1,
        });
    }

  async findOne(id: string) {
    const news = await this.newsModel.findById(id);

    if (!news) {
      throw new NotFoundException(
        'News not found',
      );
    }

    return news;
  }

  async update(
    id: string,
    updateNewsDto: UpdateNewsDto,
  ) {
    const news = await this.newsModel.findById(id);

    if (!news) {
      throw new NotFoundException(
        'News not found',
      );
    }

    // Delete old image if changed
    if (
      updateNewsDto.image &&
      news.imagePublicId &&
      updateNewsDto.image !== news.image
    ) {
      await this.cloudinaryService.deleteFile(
        news.imagePublicId,
      );
    }

    Object.assign(news, updateNewsDto);

    await news.save();

    return news;
  }

  async remove(id: string) {
    const news = await this.newsModel.findById(id);

    if (!news) {
      throw new NotFoundException(
        'News not found',
      );
    }

    // Delete image from Cloudinary
    if (news.imagePublicId) {
      await this.cloudinaryService.deleteFile(
        news.imagePublicId,
      );
    }

    await news.deleteOne();

    return {
      message: 'News deleted successfully',
    };
  }
}