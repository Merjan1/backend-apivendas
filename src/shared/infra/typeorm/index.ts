import { DataSource } from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '@modules/products/infra/typeorm/entities/Product';
import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

import { CreateProducts1657311554719 } from './migrations/1657311554719-CreateProducts';
import { CreateUsers1657724654083 } from './migrations/1657724654083-CreateUsers';
import { CreateUserTokens1657888018516 } from './migrations/1657888018516-CreateUserTokens';
import { CreateCustomers1658170499323 } from './migrations/1658170499323-CreateCustomers';
import { CreateOrders1658248537720 } from './migrations/1658248537720-CreateOrders';
import { AddCustomerIdToOrders1658248766920 } from './migrations/1658248766920-AddCustomerIdToOrders';
import { CreateOrdersProducts1658251218059 } from './migrations/1658251218059-CreateOrdersProducts';
import { AddOrderIdToOrdersProduct1658251388773 } from './migrations/1658251388773-AddOrderIdToOrdersProduct';
import { AddProductIdToOrdersProducts1658252393558 } from './migrations/1658252393558-AddProductIdToOrdersProducts';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateProducts1657311554719,
    CreateUsers1657724654083,
    CreateUserTokens1657888018516,
    CreateCustomers1658170499323,
    CreateOrders1658248537720,
    AddCustomerIdToOrders1658248766920,
    CreateOrdersProducts1658251218059,
    AddOrderIdToOrdersProduct1658251388773,
    AddProductIdToOrdersProducts1658252393558,
  ],
});
