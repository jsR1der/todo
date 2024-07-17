import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<Users> {
    const userData = this.userRepository.create(createUserDto);
    return await this.userRepository.save(userData);
  }

  public async findAll() {
    return await this.userRepository.find();
  }

  public async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  public async remove(id: number) {
    return await this.userRepository.delete({ id });
  }
}
