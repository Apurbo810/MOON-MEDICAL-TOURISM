import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DoctorDocument = HydratedDocument<Doctor>;

@Schema({ timestamps: true })
export class Doctor {
  @Prop({ required: true })
  name!: string;

  @Prop({
    required: true,
    enum: ['male', 'female'],
  })
  gender!: string;

  @Prop({ required: true })
  departmentSlug!: string;

  @Prop({ required: true })
  department!: string;

  @Prop({ required: true })
  designation!: string;

  @Prop({ required: true })
  qualifications!: string;

  @Prop()
  hospital?: string;

  @Prop()
  image?: string;

  @Prop({
  default: true,
  })
  isActive!: boolean;

  @Prop({
    default: 999,
  })
  displayOrder!: number;

  @Prop()
  imagePublicId?: string;

  @Prop({ required: true })
  experience!: string;

  @Prop({ required: true })
  roomNo!: string;

  @Prop({ required: true })
  about!: string;

  @Prop()
  appointmentNote?: string;

  @Prop({
    type: [
      {
        day: String,
        startTime: String,
        endTime: String,
      },
    ],
    default: [],
  })
  schedule!: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
}
export const DoctorSchema =
  SchemaFactory.createForClass(Doctor);
