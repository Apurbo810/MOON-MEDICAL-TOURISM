import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';

import {
  Department,
  DepartmentDocument,
} from './schemas/department.schema';

import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  private readonly logger = new Logger(
    DepartmentsService.name,
  );

  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createDepartmentDto: CreateDepartmentDto,
  ) {
    return this.departmentModel.create(
      createDepartmentDto,
    );
  }

  async findAll(query?: any) {
    const filter: any = {};

    if (query?.isActive !== undefined) {
      filter.isActive =
        query.isActive === 'true';
    }

    const departments = await this.departmentModel
      .find(filter)
      .sort({
        displayOrder: 1,
      });

    this.logger.log(
      `Departments returned from API: ${JSON.stringify(
        departments.map((department) => ({
          id: department._id,
          title: department.title,
          slug: department.slug,
        })),
      )}`,
    );

    return departments;
  }

  async findOne(slug: string) {
    const normalizedSlug = slug?.trim();
    const normalizedSlugValue =
      normalizedSlug?.toLowerCase();

    if (
      !normalizedSlug ||
      normalizedSlugValue === 'undefined' ||
      normalizedSlugValue === 'null'
    ) {
      throw new BadRequestException(
        'A valid department slug is required',
      );
    }

    const department =
      await this.departmentModel.findOne({
        slug: normalizedSlug,
      });

    if (!department) {
      throw new NotFoundException(
        'Department not found',
      );
    }

    return department;
  }

  async update(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ) {
    const department =
      await this.departmentModel.findById(id);

    if (!department) {
      throw new NotFoundException(
        'Department not found',
      );
    }

    // Delete old icon
    if (
      updateDepartmentDto.icon &&
      department.iconPublicId &&
      updateDepartmentDto.icon !==
        department.icon
    ) {
      await this.cloudinaryService.deleteFile(
        department.iconPublicId,
      );
    }

    // Delete old banner
    if (
      updateDepartmentDto.banner &&
      department.bannerPublicId &&
      updateDepartmentDto.banner !==
        department.banner
    ) {
      await this.cloudinaryService.deleteFile(
        department.bannerPublicId,
      );
    }

    Object.assign(
      department,
      updateDepartmentDto,
    );

    await department.save();

    return department;
  }

  async remove(id: string) {
    const department =
      await this.departmentModel.findById(id);

    if (!department) {
      throw new NotFoundException(
        'Department not found',
      );
    }

    // Delete icon
    if (department.iconPublicId) {
      await this.cloudinaryService.deleteFile(
        department.iconPublicId,
      );
    }

    // Delete banner
    if (department.bannerPublicId) {
      await this.cloudinaryService.deleteFile(
        department.bannerPublicId,
      );
    }

    await department.deleteOne();

    return {
      message:
        'Department deleted successfully',
    };
  }
}
