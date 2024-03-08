import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  Auth,
  AuthRepository,
  AuthUseCase,
  ErrorAccountExists,
  ErrorIdNotFound,
} from '../../../../domain/auth.domain';
import { DecodedIdToken } from 'firebase-admin/lib/auth';

@Injectable()
export class BaseService implements AuthUseCase {
  constructor(@Inject('AuthRepository') private repository: AuthRepository) {}

  verifyToken(token: string): Promise<DecodedIdToken> {
    return this.repository.verifyToken(token);
  }

  async create(account: Auth): Promise<Auth> {
    try {
      const isExists = await this.repository.getById(account.id);
      if (isExists) {
        throw ErrorAccountExists;
      }
    } catch (e) {
      if ((e as HttpException) == ErrorAccountExists) {
        throw e;
      } else {
        try {
          return this.repository.create(account);
        } catch (e) {
          throw e;
        }
      }
    }
  }

  getAll(): Promise<Auth[]> {
    try {
      return this.repository.getAll();
    } catch (e) {
      throw e;
    }
  }

  getById(id: string): Promise<Auth> {
    try {
      if (!id) {
        throw ErrorIdNotFound;
      } else {
        return this.repository.getById(id);
      }
    } catch (e) {
      throw e;
    }
  }

  update(account: Auth): Promise<Auth> {
    try {
      const isExists = this.repository.getById(account.id);
      if (isExists) {
        return this.repository.update(account);
      }
    } catch (e) {
      throw e;
    }
  }
}
