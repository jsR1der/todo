import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const saltsOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.pass, saltsOrRounds);
    const userData = this.userRepository.create({
      ...createUserDto,
      pass: hashedPassword,
    });
    return await this.userRepository.save(userData);
  }

  public async findAll() {
    return await this.userRepository.find();
  }

  public async findOne(key: keyof User, value: any) {
    return await this.userRepository.findOneBy({ [key]: value });
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  public async remove(id: number) {
    return await this.userRepository.delete({ id });
  }
}
