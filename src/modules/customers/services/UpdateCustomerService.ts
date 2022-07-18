import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepositoy = getCustomRepository(CustomersRepository);

    const customer = await customersRepositoy.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    const customerExists = await customersRepositoy.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already another customer with this email.');
    }

    customer.name = name;
    customer.email = email;

    await customersRepositoy.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
