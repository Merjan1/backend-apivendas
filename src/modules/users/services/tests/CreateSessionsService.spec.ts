import 'reflect-metadata';

import CreateSessionService from '../CreateSessionsService';
import FakeUsersRepository from '../../domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/hashProvider/fakes/FakeHashProvider';
import AppError from '../../../../shared/errors/AppError';

let createSession: CreateSessionService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jest Test',
      email: 'jest@testjest.com.br',
      password: '123456',
    });

    const response = await createSession.execute({
      email: 'jest@testjest.com.br',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    expect(
      createSession.execute({
        email: 'nonExistingEmail@test.com.br',
        password: '456123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with invalid password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jest Test',
      email: 'jest@testjest.com.br',
      password: '123456',
    });

    expect(
      createSession.execute({
        email: 'jest@testjest.com.br',
        password: '7654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
