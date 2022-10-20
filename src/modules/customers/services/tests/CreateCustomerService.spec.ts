import 'reflect-metadata';

import AppError from '../../../../shared/errors/AppError';
import CreateCustomerService from '../CreateCustomerService';
import FakeCustomersRepository from '../../domain/repositories/fakes/FakeCustomersRepository';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Jest Test',
      email: 'teste@testando123.com.br',
    });

    expect(customer).toHaveProperty('id');
  });

  it('shoulod not be able to create two customers with the same email', async () => {
    await createCustomer.execute({
      name: 'Jest Test',
      email: 'teste@testando123.com.br',
    });

    expect(
      createCustomer.execute({
        name: 'Jest Test',
        email: 'teste@testando123.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
