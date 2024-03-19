import { Inject, Injectable } from '@nestjs/common';
import {
  Auth,
  AuthInterop,
  AuthUseCase,
  ErrorBlockFailed,
  ErrorChangeRoleFailed,
  ErrorInvalidRole,
  ErrorPermissionDenied,
} from '../../../domain/auth.domain';

@Injectable()
export class InteropService implements AuthInterop {
  constructor(@Inject('AuthUseCase') private authUseCase: AuthUseCase) {}

  async block(token: string, id: string): Promise<Auth> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      const account = await this.authUseCase.getById(id);
      account.isBanned = true;
      if (account.id === decodedToken.uid) {
        throw ErrorBlockFailed;
      } else {
        return await this.authUseCase.update(account);
      }
    } catch (e) {
      throw e;
    }
  }

  async unblock(token: string, id: string): Promise<Auth> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      const account = await this.authUseCase.getById(id);
      account.isBanned = false;
      if (account.id === decodedToken.uid) {
        throw ErrorBlockFailed;
      } else {
        return await this.authUseCase.update(account);
      }
    } catch (e) {
      throw e;
    }
  }

  async changeRole(token: string, id: string, role: string): Promise<Auth> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      const account = await this.authUseCase.getById(id);
      account.role = role;
      if (account.id === decodedToken.uid) {
        throw ErrorChangeRoleFailed;
      } else {
        if (!account.role || !['admin', 'user'].includes(account.role)) {
          throw ErrorInvalidRole;
        } else {
          return await this.authUseCase.update(account);
        }
      }
    } catch (e) {
      throw e;
    }
  }

  async getAll(token: string): Promise<Auth[]> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      const isAdmin = await this.authUseCase.getById(decodedToken.uid);

      if (isAdmin.role !== 'admin') {
        throw ErrorPermissionDenied;
      }
      return await this.authUseCase.getAll();
    } catch (e) {
      throw e;
    }
  }

  async getById(id: string, token: string): Promise<Auth> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      return await this.authUseCase.getById(id);
    } catch (e) {
      throw e;
    }
  }

  async signUp(token: string): Promise<Auth> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      const accountData: Auth = {
        id: decodedToken.uid,
        email: decodedToken.email,
        role: 'user',
        isBanned: false,
        createdAt: new Date(),
      };
      return await this.authUseCase.create(accountData);
    } catch (e) {
      throw e;
    }
  }
}
