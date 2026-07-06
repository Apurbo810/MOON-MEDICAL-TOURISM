  import {
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';

  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';

  import * as bcrypt from 'bcrypt';

  import { JwtService } from '@nestjs/jwt';

  import { ChangePasswordDto } from './dto/change-password.dto';
  import { LoginDto } from './dto/login.dto';
  import { Admin, AdminDocument } from './schemas/admin.schema';

  @Injectable()
  export class AuthService {
    constructor(
      @InjectModel(Admin.name)
      private adminModel: Model<AdminDocument>,

      private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
      const { email, password } = loginDto;

      const admin = await this.adminModel.findOne({ email });

      if (!admin) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordMatched = await bcrypt.compare(
        password,
        admin.password,
      );

      if (!isPasswordMatched) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        sub: admin._id,
        email: admin.email,
        role: admin.role,
      };

      const accessToken =
        this.jwtService.sign(payload);

      return {
        message: 'Login successful',

        accessToken,

        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          photo: admin.photo,
          createdAt: admin.createdAt,
        },
      };
    }

    async changePassword(changePasswordDto: ChangePasswordDto) {
      const { currentPassword, newPassword } = changePasswordDto;

      const admin = await this.adminModel.findOne({});

      if (!admin) {
        throw new UnauthorizedException('Admin not found');
      }

      const isCurrentPasswordMatched = await bcrypt.compare(
        currentPassword,
        admin.password,
      );

      if (!isCurrentPasswordMatched) {
        throw new UnauthorizedException('Current password is incorrect');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await this.adminModel.updateOne(
        { _id: admin._id },
        { password: hashedPassword },
      );

      return {
        message: 'Password updated successfully',
      };
    }
  }