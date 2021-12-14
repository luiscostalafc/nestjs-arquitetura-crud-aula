import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from 'src/errors/entity-not-found-error';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Luis Costa',
      email: 'luis.costa@mail.com',
    },
  ];

  create(createUserDto: CreateUserDto) {
    const currentMaxId = this.users[this.users.length - 1]?.id + 1 || 0;

    const id = currentMaxId + 1;

    const user: User = {
      id,
      ...createUserDto,
    };

    this.users.push(user);

    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user: User) => user.id === id);

    if (!user) {
      throw new EntityNotFoundError();
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);

    const newUser: User = {
      ...user,
      ...updateUserDto,
    };

    const index = this.users.indexOf(user);

    this.users[index] = newUser;
  }

  remove(id: number) {
    const user = this.findOne(id);

    const index = this.users.indexOf(user);

    this.users.splice(index, 1);
  }
}
