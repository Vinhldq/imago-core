import { Injectable } from '@nestjs/common';
import { AllCategories } from '../../../../domain/category.domain';
import { HttpException } from '@nestjs/common';
import {
  CategoryDomain,
  CategoryRepository,
  ErrorCategoryDeleteFailed,
} from '../../../../domain/category.domain';
import * as admin from 'firebase-admin';

@Injectable()
export class CategoryRepositoryBaseService implements CategoryRepository {
  private db: admin.firestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  async createCategory(category: CategoryDomain): Promise<boolean> {
    try {
      await this.db.collection('categories').doc(category.id).set(category);
      return true;
    } catch (e) {
      throw e;
    }
  }

  async deleteCategory(id: string): Promise<boolean> {
    // try{
    //     const category = await this.db.collection('categories').doc(id).delete();
    //     return true;
    // }catch (e) {
    //     throw e;
    // }
    try {
      const docRef = this.db.collection('categories').doc(id);
      const doc = await docRef.get();
      if (!doc.exists) {
        throw ErrorCategoryDeleteFailed;
      }
      await docRef.delete();
      return true;
    } catch (e) {
      throw e;
    }
  }

  async getCategory(id: string): Promise<CategoryDomain> {
    try {
      const category = await this.db.collection('categories').doc(id).get();
      return category.data() as CategoryDomain;
    } catch (e) {
      throw e;
    }
  }

  async getCategories(page: number): Promise<AllCategories> {
    try {
      const categoryRef = this.db.collection('categories');
      const snapshot = await categoryRef.get();
      const categories = snapshot.docs.map(
        (doc) => doc.data() as CategoryDomain,
      );
      const size = 2;
      return {
        data: categories.slice((page - 1) * size, page * size),
        endPage: Math.ceil(categories.length / size),
      };
    } catch (e) {
      throw e;
    }
  }
}
