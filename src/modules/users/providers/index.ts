import { container } from 'tsyringe';

import BCryptHashProvider from './hashProvider/implementations/BCrypHashProvider';
import { IHashProvider } from './hashProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
