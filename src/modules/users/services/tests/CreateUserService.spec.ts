import 'reflect-metadata';

import AppError from '../../../../shared/errors/AppError';
import CreateUserService from '../CreateUserService';
import FakeUsersRepository from '../../domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/hashProvider/fakes/FakeHashProvider';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Jest Test',
      email: 'teste@testando123.com.br',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create tow users with the same email', async () => {
    await createUser.execute({
      name: 'Jest Test',
      email: 'teste@testando123.com .br',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Jest Test',
        email: 'teste@testando123.com .br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
