import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NewsController } from './news.controller';
import { NewsService } from './news.service';

import {
  News,
  NewsSchema,
} from './schemas/news.schema';

import { CloudinaryModule } from '../../common/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: News.name,
        schema: NewsSchema,
      },
    ]),

    CloudinaryModule,
  ],

  controllers: [NewsController],

  providers: [NewsService],

  exports: [NewsService],
})
export class NewsModule {}