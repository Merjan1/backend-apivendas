import { IProduct } from '../models/IProduct';
import { IFindProduct } from '../models/IFindProduct';
import { ICreateProduct } from '../models/ICreateProduct';
import { IUpdateStockProduct } from '../models/IUpdateStockProduct';
import Product from '@modules/products/infra/typeorm/entities/Product';

export interface IProductsRepository {
  findByName(name: string): Promise<Product | undefined>;
  findById(id: string): Promise<Product | undefined>;
  findAll(): Promise<Product[]>;
  findAllByIds(products: IFindProduct[]): Promise<Product[]>;
  create(data: ICreateProduct): Promise<Product>;
  save(product: Product): Promise<Product>;
  updateStock(products: IUpdateStockProduct[]): Promise<void>;
  remove(product: Product): Promise<void>;
}
