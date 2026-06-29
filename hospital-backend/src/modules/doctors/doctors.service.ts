import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';

import {
  Doctor,
  DoctorDocument,
} from './schemas/doctor.schema';

import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.name)
    private doctorModel: Model<DoctorDocument>,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const doctor = await this.doctorModel.create(
      createDoctorDto,
    );

    return doctor;
  }

  async findAll(query: any) {
    const filter: any = {};

    // Search by doctor name
    if (query.search) {
      filter.name = {
        $regex: query.search,
        $options: 'i',
      };
    }

    // Filter by department
    if (query.department) {
      filter.departmentSlug =
        query.department;
    }

    // Filter by status
    if (query.isActive !== undefined) {
      filter.isActive =
        query.isActive === 'true';
    }

    return this.doctorModel
      .find(filter)
      .sort({
        displayOrder: 1,
      });
  }
  async findOne(id: string) {
    const doctor = await this.doctorModel.findById(id);

    if (!doctor) {
      throw new NotFoundException(
        'Doctor not found',
      );
    }

    return doctor;
  }

  async update(
    id: string,
    updateDoctorDto: UpdateDoctorDto,
  ) {
    const doctor = await this.doctorModel.findById(id);

    if (!doctor) {
      throw new NotFoundException(
        'Doctor not found',
      );
    }

    // Delete old image if new image uploaded
    if (
      updateDoctorDto.image &&
      doctor.imagePublicId &&
      updateDoctorDto.image !== doctor.image
    ) {
      await this.cloudinaryService.deleteFile(
        doctor.imagePublicId,
      );
    }

    Object.assign(doctor, updateDoctorDto);

    await doctor.save();

    return doctor;
  }

  async remove(id: string) {
    const doctor = await this.doctorModel.findById(id);

    if (!doctor) {
      throw new NotFoundException(
        'Doctor not found',
      );
    }

    // Delete image from Cloudinary
    if (doctor.imagePublicId) {
      await this.cloudinaryService.deleteFile(
        doctor.imagePublicId,
      );
    }

    // Delete document from MongoDB
    await doctor.deleteOne();

    return {
      message: 'Doctor deleted successfully',
    };
  }
}