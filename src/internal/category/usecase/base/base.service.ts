import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  AllCategories,
  CategoryDomain,
  CategoryRepository,
  CategoryUseCase,
  ErrorCategoryAlreadyExisted,
  ErrorCategoryDeleteFailed,
  ErrorCategoryNameRequired,
  ErrorCategoryNotCreated,
  ErrorCategoryNotFound,
  ErrorCategoryNotString,
  ErrorCategoryPhotoRequired,
} from '../../../../domain/category.domain';
import * as admin from 'firebase-admin';
import e from 'express';
import { awaitExpression } from '@babel/types';
import { ErrorEmptyPage, ErrorPostId } from '../../../../domain/comment.domain';
import { ErrorEmptyPageData, PageError } from '../../../../domain/post.domain';

@Injectable()
export class CategoryUseCaseBaseService implements CategoryUseCase {
  constructor(
    @Inject('CategoryRepository') private repository: CategoryRepository,
  ) {}

  async createCategory(category: CategoryDomain): Promise<boolean> {
    if (typeof category.id !== 'string') {
      throw ErrorCategoryNotString;
    }
    if (
      category.name === '' ||
      category.name === undefined ||
      category.name === null
    ) {
      throw ErrorCategoryNameRequired;
    }
    if (
      category.photoUrl === '' ||
      category.photoUrl === undefined ||
      category.photoUrl === null
    ) {
      throw ErrorCategoryPhotoRequired;
    }
    let existed = await this.repository.getCategory(category.id);
    if (existed) {
      throw ErrorCategoryAlreadyExisted;
    }
    if (
      !category.name ||
      !category.photoUrl ||
      !category.users ||
      !category.id
    ) {
      throw ErrorCategoryNotCreated;
    }
    return this.repository.createCategory(category);
  }

  async deleteCategory(id: string): Promise<boolean> {
    let existed = await this.repository.getCategory(id);
    if (!existed) {
      console.error(ErrorCategoryDeleteFailed);
    }
    return this.repository.deleteCategory(id);
  }

  async getCategory(id: string): Promise<CategoryDomain> {
    // return await this.repository.getCategory(id);
    let existed = await this.repository.getCategory(id);
    if (!existed) {
      throw ErrorCategoryNotFound;
    }
    return this.repository.getCategory(id);
  }

  async getCategories(page: number): Promise<AllCategories> {
    let endpage: number;
    const categoryRef = await this.repository.getCategories(page);
    endpage = categoryRef.endPage;
    if (page < 1) {
      throw PageError;
    } else if (page === undefined || page === null || isNaN(page)) {
      throw ErrorEmptyPage;
    } else if (page > endpage) {
      throw ErrorEmptyPageData;
    } else {
      return categoryRef;
    }
  }
}
