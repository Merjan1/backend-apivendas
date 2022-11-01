import 'reflect-metadata';

import AppError from '../../../../shared/errors/AppError';
import FakeCustomersRepository from '../../domain/repositories/fakes/FakeCustomersRepository';
import DeleteCustomerService from '../DeleteCustomerService';

let fakeCustomersRepository: FakeCustomersRepository;
let deleteCustomer: DeleteCustomerService;

describe('DeleteCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    deleteCustomer = new DeleteCustomerService(fakeCustomersRepository);
  });

  it('Should be able to delete a customer', async () => {
    const customer = await fakeCustomersRepository.create({
      name: 'Jest Test Customer',
      email: 'teste@testando123.com',
    });

    const customer1 = await fakeCustomersRepository.create({
      name: 'Zé Ninguém',
      email: 'zeteste@zetestando1.com',
    });

    const showAll = await fakeCustomersRepository.findAll();

    console.log('showAllCustomers:', showAll);

    const deletedCustomer = await deleteCustomer.execute(customer1);

    console.log('after Delete:', showAll);

    expect(deletedCustomer).toBeUndefined();
  });

  it('Should not be able to delete a customer', async () => {
    const inexistentUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };

    expect(deleteCustomer.execute(inexistentUser)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
