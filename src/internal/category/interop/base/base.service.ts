import { Inject, Injectable } from '@nestjs/common';
import { AllCategories, CategoryDomain, CategoryInterop, CategoryUseCase } from '../../../../domain/category.domain';
import { DecodedIdToken } from 'firebase-admin/lib/auth';
import { AuthUseCase } from '../../../../domain/auth.domain';

@Injectable()
export class CategoryInteropBaseService implements CategoryInterop {
  constructor(@Inject('CategoryUseCase') private useCase: CategoryUseCase, @Inject('AuthUseCase') private authUseCase: AuthUseCase, ) {
  }
    async createCategory(category: CategoryDomain) {
      try {
        return await this.useCase.createCategory(category);
      }
      catch (e) {
        throw e;
      }
    }

    async updateCategory(id: string, category: CategoryDomain) {
      try {
        return await this.useCase.updateCategory(id, category);
      }
      catch (e) {
        throw e;
      }
    }

    async deleteCategory(id: string){
        try {
          return this.useCase.deleteCategory(id);
        }catch (e) {
            throw e;
        }
    }
    async getCategory(id: string): Promise<CategoryDomain> {
    try {
      return this.useCase.getCategory(id);
    } catch (e) {
      throw e;
    }
    }
    async getCategories(
      page: number,
      token: string
    ): Promise<AllCategories> {
      try{
        await this.authUseCase.verifyToken(token);
        return this.useCase.getCategories(page);
      } catch (e) {
        throw e;
      }
    }
}
 
