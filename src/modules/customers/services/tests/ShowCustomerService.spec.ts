import 'reflect-metadata';

import AppError from '../../../../shared/errors/AppError';
import FakeCustomersRepository from '../../domain/repositories/fakes/FakeCustomersRepository';
import ShowCustomerService from '../ShowCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let showCustomer: ShowCustomerService;

describe('ShowCustomerService', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    showCustomer = new ShowCustomerService(fakeCustomersRepository);
  });

  it('Should be able to return a single customer', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'Jest Test Customer',
      email: 'teste@testando123.com',
    });

    const showSingleCustomer = await showCustomer.execute(customer);

    console.log('Show Single Customer', showSingleCustomer);

    expect(showSingleCustomer).toBeTruthy();
  });

  it('Should not be able to show singel customer', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'Jest Test Customer',
      email: 'teste@testando123.com',
    });

    const inexistentUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };

    expect(showCustomer.execute(inexistentUser)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
