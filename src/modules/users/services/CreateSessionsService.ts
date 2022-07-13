import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/user';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

// interface IResponse {
//   user: User;
// }

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect username or password', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect username or password', 401);
    }

    return user;
  }
}

export default CreateSessionsService;
