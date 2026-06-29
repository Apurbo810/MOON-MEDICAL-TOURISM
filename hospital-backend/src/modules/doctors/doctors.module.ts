import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { CloudinaryModule } from '../../common/cloudinary/cloudinary.module';


import {
  Doctor,
  DoctorSchema,
} from './schemas/doctor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Doctor.name,
        schema: DoctorSchema,
      },
    ]),

    CloudinaryModule,
  ],

  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}