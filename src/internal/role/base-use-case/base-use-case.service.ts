import { Inject, Injectable } from '@nestjs/common';
import {
  ErrorEmptyPage,
  ErrorMinusPage,
  ErrorMinusSize,
  errorRoleNotFound,
  keywordEmpty,
  Role,
  RolePagination,
  RoleRepository,
  RoleUseCase,
} from '../../../domain/role.domain';
import * as admin from 'firebase-admin';
import { ErrorEmptySize } from '../../../domain/post.domain';

@Injectable()
export class BaseUseCaseService implements RoleUseCase {
  constructor(@Inject('RoleRepository') private roleRepo: RoleRepository) {}

  async getAllRole(page: number, size: number): Promise<RolePagination> {
    if (page < 1) {
      throw ErrorMinusPage;
    } else if (page < 1) {
      throw ErrorMinusSize;
    } else if (page === undefined || page === null || isNaN(page)) {
      throw ErrorEmptyPage;
    } else if (size === undefined || size === null || isNaN(size)) {
      throw ErrorEmptySize;
    } else {
      return this.roleRepo.getAllRole(page, size);
    }
  }

  async getListRole(page: number, size: number): Promise<any> {
    if (page < 1) {
      throw ErrorMinusPage;
    } else if (page < 1) {
      throw ErrorMinusSize;
    } else if (page === undefined || page === null || isNaN(page)) {
      throw ErrorEmptyPage;
    } else if (size === undefined || size === null || isNaN(size)) {
      throw ErrorEmptySize;
    } else {
      return this.roleRepo.getListRole(page, size);
    }
  }

  async createRole(role: Role): Promise<admin.firestore.WriteResult> {
    return await this.roleRepo.createRole(role);
  }

  async updateRole(
    id: string,
    role: Role,
  ): Promise<admin.firestore.WriteResult> {
    return await this.roleRepo.updateRole(id, role);
  }

  deleteRole(id: string): Promise<admin.firestore.WriteResult> {
    if (id === 'null') {
      throw errorRoleNotFound;
    }
    return this.roleRepo.deleteRole(id);
  }
}
