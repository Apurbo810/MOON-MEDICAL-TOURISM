import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NewsDocument =
  HydratedDocument<News>;

@Schema({ timestamps: true })
export class News {
  @Prop({
    required: true,
  })
  title!: string;

  @Prop({
    required: true,
  })
  description!: string;

  @Prop()
  image?: string;

  @Prop()
  imagePublicId?: string;

  @Prop({
    default: 999,
  })
  displayOrder!: number;

  @Prop({
    default: true,
  })
  isPublished!: boolean;
}

export const NewsSchema =
  SchemaFactory.createForClass(News);