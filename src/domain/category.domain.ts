import { HttpException } from '@nestjs/common';
export interface CategoryDomain {
  id: string;
  name: string;
  users: string[];
  photoUrl: string;
}
export interface AllCategories {
  data: CategoryDomain[];
  endPage: number;
}
export interface CategoryRepository {
  createCategory(category: CategoryDomain): Promise<boolean>;
  deleteCategory(id: string): Promise<boolean>;
  getCategory(id: string): Promise<CategoryDomain>;
  getCategories(page: number): Promise<AllCategories>;
}

export interface CategoryUseCase {
  createCategory(category: CategoryDomain): Promise<boolean>;
  deleteCategory(id: string): Promise<boolean>;
  getCategory(id: string): Promise<CategoryDomain>;
  getCategories(page: number): Promise<AllCategories>;
}

export interface CategoryInterop {
  createCategory(category: CategoryDomain): any;
  deleteCategory(id: string): any;
  getCategory(id: string): Promise<CategoryDomain>;
  getCategories(page: number, token: string): Promise<AllCategories>;
}

export const ErrorCategoryNameRequired: HttpException = new HttpException(
  'Category name is required',
  400,
);
export const ErrorCategoryPhotoRequired: HttpException = new HttpException(
  'Category photo is required',
  400,
);
export const ErrorCategoryNotCreated: HttpException = new HttpException(
  'Category not created',
  400,
);
export const ErrorCategoryAlreadyExisted: HttpException = new HttpException(
  'Category already existed',
  400,
);
export const ErrorCategoryNotFound: HttpException = new HttpException(
  'Category not found',
  400,
);
export const ErrorCategoryDeleteFailed: HttpException = new HttpException(
  'Category not found to delete',
  400,
);
export const ErrorCategoryNotString: HttpException = new HttpException(
  'Category not created by Id is not string',
  400,
);
