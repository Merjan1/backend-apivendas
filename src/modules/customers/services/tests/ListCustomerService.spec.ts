import 'reflect-metadata';

import AppError from '../../../../shared/errors/AppError';
import FakeCustomersRepository from '../../domain/repositories/fakes/FakeCustomersRepository';
import ListCustomerService from '../ListCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let listCustomers: ListCustomerService;

describe('ListCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    listCustomers = new ListCustomerService(fakeCustomersRepository);
  });

  it('Should be able to return a list of all the customers', async () => {
    await fakeCustomersRepository.create({
      name: 'Jest Test Customer',
      email: 'teste@testando123.com',
    });

    await fakeCustomersRepository.create({
      name: 'Zé Ninguém',
      email: 'zeteste@zetestando1.com',
    });

    const findAll = await listCustomers.execute();

    console.log('findAll:', findAll);

    expect(findAll).toBeTruthy();
  });
});
