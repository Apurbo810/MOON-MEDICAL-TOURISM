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

import { DoctorsService } from './doctors.service';

import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';
@Controller('doctors')
export class DoctorsController {
  constructor(
    private readonly doctorsService: DoctorsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result: any =
      await this.cloudinaryService.uploadFile(file);

    return {
      imageUrl: result.secure_url,
      publicId: result.public_id,
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createDoctorDto: CreateDoctorDto,
  ) {
    return this.doctorsService.create(
      createDoctorDto,
    );
  }



  @Get()
  findAll(@Query() query: any) {
    return this.doctorsService.findAll(query);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    return this.doctorsService.update(
      id,
      updateDoctorDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(id);
  }
}