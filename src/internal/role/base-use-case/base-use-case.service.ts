import { Inject, Injectable } from '@nestjs/common';
import {
  ErrorEmptyPage,
  ErrorEmptyPageData,
  ErrorMinusPage,
  errorRoleNotFound,
  keywordEmpty,
  Role,
  RolePagination,
  RoleRepository,
  RoleUseCase,
} from '../../../domain/role.domain';
import * as admin from 'firebase-admin';

@Injectable()
export class BaseUseCaseService implements RoleUseCase {
  constructor(@Inject('RoleRepository') private roleRepo: RoleRepository) {}

  async getAllRole(page: number): Promise<RolePagination> {
    let skip: number;
    const roleRef = await this.roleRepo.getAllRole(page);
    skip = roleRef.endPage;
    if (page < 1) {
      throw ErrorMinusPage;
    } else if (page === undefined || page === null || isNaN(page)) {
      throw ErrorEmptyPage;
    } else if (page > skip) {
      throw ErrorEmptyPageData;
    } else {
      return this.roleRepo.getAllRole(page);
    }
  }

  async getListRole(page: number): Promise<any> {
    let skip: number;
    const listRoleRef = await this.roleRepo.getListRole(page);
    skip = listRoleRef.endPage;
    if (page < 1) {
      throw ErrorMinusPage;
    } else if (page === undefined || page === null || isNaN(page)) {
      throw ErrorEmptyPage;
    } else if (page > skip) {
      throw ErrorEmptyPageData;
    } else {
      return listRoleRef;
    }
  }

  async searchRole(keyword: string, page: number): Promise<RolePagination> {
    let skip: number;
    const searchRoleRef = await this.roleRepo.searchRole(keyword, page);
    skip = searchRoleRef.endPage;
    if (keyword === undefined || keyword === null || keyword === '') {
      throw keywordEmpty;
    } else if (page < 1) {
      throw ErrorMinusPage;
    } else if (page === undefined || page === null || isNaN(page)) {
      throw ErrorEmptyPage;
    } else if (page > skip) {
      throw ErrorEmptyPageData;
    }
    return await this.roleRepo.searchRole(keyword, page);
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
