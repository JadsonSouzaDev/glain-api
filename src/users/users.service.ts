import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ListUserDto } from './dto/list-user.dto';
import { User } from './entities/user.entity';
import { createToEntity, updateToEntity } from './entities/user.factory';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prismaService.user.findFirst({
      where: {
        OR: [
          {
            email: createUserDto.email,
          },
          {
            whatsapp: createUserDto.whatsapp,
          },
        ],
        active: true,
      },
    });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const data = createToEntity(createUserDto);
    const user = await this.prismaService.user.create({
      data,
    });

    return new ListUserDto(user);
  }

  async findAll() {
    const users = await this.prismaService.user.findMany({
      where: {
        active: true,
      },
    });

    return users.map((user) => new ListUserDto(user));
  }

  private async getUser(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
        active: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOne(id: string) {
    const user = await this.getUser(id);
    return new ListUserDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user: User = await this.getUser(id);
    const updateUser = updateToEntity(updateUserDto, user);
    const savedUser = await this.prismaService.user.update({
      where: {
        id,
        active: true,
      },
      data: updateUser,
    });

    return new ListUserDto(savedUser);
  }

  remove(id: string) {
    return this.prismaService.user.update({
      where: {
        id,
        active: true,
      },
      data: {
        active: false,
      },
    });
  }
}
