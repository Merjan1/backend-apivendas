import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
// import path from 'path';
// import fs from 'fs';

import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import DiskStorageProvider from '@shared/providers/Storage/DiskStorageProvider';
import uploadConfig from '@config/upload';
import S3StorageProvider from '@shared/providers/Storage/S3StorageProvider';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ avatarFilename, user_id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    if (uploadConfig.driver === 's3') {
      const s3Provider = new S3StorageProvider();
      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }

      const fileName = await s3Provider.saveFile(avatarFilename);

      user.avatar = fileName;
    } else {
      const diskProvider = new DiskStorageProvider();
      if (user.avatar) {
        await diskProvider.deleteFile(user.avatar);
      }

      const fileName = await diskProvider.saveFile(avatarFilename);

      user.avatar = fileName;
    }

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
