import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DepartmentDocument =
  HydratedDocument<Department>;

@Schema({ timestamps: true })
export class Department {
  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  title!: string;

  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  slug!: string;

  @Prop()
  icon?: string;

  @Prop()
  iconPublicId?: string;

  @Prop()
  shortDescription?: string;

  @Prop()
  content?: string;

  @Prop({
    type: [String],
    default: [],
  })
  services!: string[];

  @Prop({
    default: 999,
  })
  displayOrder!: number;

  @Prop({
    default: true,
  })
  isActive!: boolean;
}

export const DepartmentSchema =
  SchemaFactory.createForClass(Department);
