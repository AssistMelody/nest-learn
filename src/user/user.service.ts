import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity as User } from './user.entity';
import { InsertResult, Repository } from 'typeorm';
import { UserEntity } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getList(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      select: ['id', 'age', 'name'],
    });
  }

  async create(data: UserEntity): Promise<InsertResult> {
    return await this.userRepository.insert(data);
  }

  update(id: number, data: Partial<User>) {
    data.updatedAt = new Date();
    return this.userRepository.update(id, data);
  }

  delete(id: number) {
    return this.userRepository.delete(id);
  }
}
