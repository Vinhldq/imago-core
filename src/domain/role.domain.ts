import { HttpException, HttpStatus } from '@nestjs/common';
import * as admin from 'firebase-admin';

export interface Role {
  id: string;
  name: string;
  description: string;
}

export interface RolePagination {
  data: Role[];
  endPage: number;
}

export interface RoleRepository {
  getAllRole(page: number): Promise<RolePagination>;

  createRole(role: Role): Promise<admin.firestore.WriteResult>;

  updateRole(id: string, role: Role): Promise<admin.firestore.WriteResult>;

  deleteRole(id: string): Promise<admin.firestore.WriteResult>;

  searchRole(keyword: string, page: number): Promise<RolePagination>;

  getListRole(page: number): Promise<any>;
}

export interface RoleUseCase {
  getAllRole(page: number): Promise<RolePagination>;

  createRole(role: Role): Promise<admin.firestore.WriteResult>;

  updateRole(id: string, role: Role): Promise<admin.firestore.WriteResult>;

  deleteRole(id: string): Promise<admin.firestore.WriteResult>;

  searchRole(keyword: string, page: number): Promise<RolePagination>;

  getListRole(page: number): Promise<any>;
}

export interface RoleInterop {
  getAllRole(token: string, page: number): Promise<RolePagination>;

  createRole(token: string, role: Role): Promise<admin.firestore.WriteResult>;

  updateRole(
    token: string,
    id: string,
    role: Role,
  ): Promise<admin.firestore.WriteResult>;

  deleteRole(token: string, id: string): Promise<admin.firestore.WriteResult>;

  searchRole(
    token: string,
    keyword: string,
    page: number,
  ): Promise<RolePagination>;

  getListRole(token: string, page: number): Promise<any>;
}

export const errorRoleNotFound = new HttpException(
  'Role Not Found',
  HttpStatus.NOT_FOUND,
);
export const keywordEmpty = new HttpException(
  'Keyword is empty',
  HttpStatus.NOT_FOUND,
);
export const searchRoleEmpty = new HttpException(
  'Search role is empty',
  HttpStatus.NOT_FOUND,
);

export const roleIdEmpty = new HttpException(
  'Role id is empty',
  HttpStatus.NOT_FOUND,
);
export const roleNameEmpty = new HttpException(
  'Role name is empty',
  HttpStatus.NOT_FOUND,
);
export const roleIdDoNotEnterNumber = new HttpException(
  'Role id do not enter number',
  HttpStatus.NOT_FOUND,
);
export const roleNameDoNotEnterNumber = new HttpException(
  'Role name do not enter number',
  HttpStatus.NOT_FOUND,
);
export const roleDescriptionDoNotEnterNumber = new HttpException(
  'Role description do not enter number',
  HttpStatus.NOT_FOUND,
);
export const roleDescriptionEmpty = new HttpException(
  'Role description is empty',
  HttpStatus.NOT_FOUND,
);

export const ErrorEmptyPage: HttpException = new HttpException(
  'Role page is empty',
  HttpStatus.BAD_REQUEST,
);
export const ErrorMinusPage: HttpException = new HttpException(
  'Page must be greater than 0',
  HttpStatus.BAD_REQUEST,
);
export const ErrorEmptyPageData: HttpException = new HttpException(
  'Page is no data',
  400,
);
