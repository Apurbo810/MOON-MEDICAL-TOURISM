import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';

import { DepartmentsService } from './departments.service';

import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(
    private readonly departmentsService: DepartmentsService,

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
    @Body()
    createDepartmentDto: CreateDepartmentDto,
  ) {
    return this.departmentsService.create(
      createDepartmentDto,
    );
  }

  @Get()
  findAll(@Query() query: any) {
    return this.departmentsService.findAll(query);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
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

    return this.departmentsService.findOne(
      normalizedSlug,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body()
    updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentsService.update(
      id,
      updateDepartmentDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(id);
  }
}
