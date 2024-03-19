import { Inject, Injectable } from '@nestjs/common';
import {
  Role,
  roleDescriptionDoNotEnterNumber,
  roleDescriptionEmpty,
  roleIdDoNotEnterNumber,
  roleIdEmpty,
  RoleInterop,
  roleNameDoNotEnterNumber,
  roleNameEmpty,
  RolePagination,
  RoleUseCase,
} from '../../../domain/role.domain';
import * as admin from 'firebase-admin';
import {
  Auth,
  AuthUseCase,
  ErrorPermissionDenied,
} from '../../../domain/auth.domain';

@Injectable()
export class RoleBaseInteropService implements RoleInterop {
  constructor(
    @Inject('RoleUseCase') private roleUseCase: RoleUseCase,
    @Inject('AuthUseCase') private authUseCase: AuthUseCase,
  ) {}

  async getAllRole(
    token: string,
    page: number,
    size: number,
  ): Promise<RolePagination> {
    try {
      await this.authUseCase.verifyToken(token);
      return await this.roleUseCase.getAllRole(page, size);
    } catch (error) {
      throw error;
    }
  }

  async getListRole(
    token: string,
    page: number,
    size: number,
  ): Promise<RolePagination> {
    try {
      await this.authUseCase.verifyToken(token);
      return await this.roleUseCase.getListRole(page, size);
    } catch (error) {
      throw error;
    }
  }

  async createRole(
    token: string,
    role: Role,
  ): Promise<admin.firestore.WriteResult> {
    try {
      let decodedToken = await this.authUseCase.verifyToken(token);
      const isAdmin = (await this.authUseCase.getById(
        decodedToken.uid,
      )) as any as Auth;

      if (isAdmin.role !== 'admin') {
        throw ErrorPermissionDenied;
      } else if (role.id === undefined || role.id === '' || role.id === null) {
        throw roleIdEmpty;
      } else if (
        role.name === undefined ||
        role.name === '' ||
        role.name === null
      ) {
        throw roleNameEmpty;
      } else if (
        role.description === undefined ||
        role.description === '' ||
        role.description === null
      ) {
        throw roleDescriptionEmpty;
      } else {
        return this.roleUseCase.createRole(role);
      }
    } catch (error) {
      throw error;
    }
  }

  async updateRole(
    token: string,
    id: string,
    role: Role,
  ): Promise<admin.firestore.WriteResult> {
    try {
      let decodedToken = await this.authUseCase.verifyToken(token);
      role.id = decodedToken.uid;
      const isAdmin = (await this.authUseCase.getById(
        decodedToken.uid,
      )) as any as Auth;
      if (isAdmin.role !== 'admin') {
        throw ErrorPermissionDenied;
      } else if (
        role.id === undefined ||
        role.id === '' ||
        role.id === null ||
        id === undefined ||
        id === '' ||
        id === null
      ) {
        throw roleIdEmpty;
      } else if (
        role.name === undefined ||
        role.name === '' ||
        role.name === null
      ) {
        throw roleNameEmpty;
      } else if (
        role.description === undefined ||
        role.description === '' ||
        role.description === null
      ) {
        throw roleDescriptionEmpty;
      }
      return this.roleUseCase.updateRole(id, role);
    } catch (error) {
      throw error;
    }
  }

  async deleteRole(
    token: string,
    id: string,
  ): Promise<admin.firestore.WriteResult> {
    try {
      let decodedToken = await this.authUseCase.verifyToken(token);
      const isAdmin = (await this.authUseCase.getById(
        decodedToken.uid,
      )) as any as Auth;
      if (isAdmin.role !== 'admin') {
        throw ErrorPermissionDenied;
      } else if (id === undefined || id === '' || id === null) {
        throw roleIdEmpty;
      }
      return this.roleUseCase.deleteRole(id);
    } catch (error) {
      throw error;
    }
  }
}
