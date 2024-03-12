import { Inject, Injectable } from '@nestjs/common';
import { SearchResult, SearchUseCase } from 'src/domain/search.domain';

@Injectable()
export class BaseUseCaseService<T> implements SearchUseCase<T> {
  constructor(
    @Inject('SearchRepository') private repository: SearchUseCase<T>,
  ) {}

  search(index: string, query: string): Promise<SearchResult<T>> {
    try {
      return this.repository.search(index, query);
    } catch (error) {
      throw error;
    }
  }
  create(index: string, item: T, id: string): Promise<boolean> {
    try {
      return this.repository.create(index, item, id);
    } catch (error) {
      throw error;
    }
  }
  update(index: string, item: T, id: string): Promise<boolean> {
    try {
      return this.repository.update(index, item, id);
    } catch (error) {
      throw error;
    }
  }
  delete(index: string, id: string): Promise<boolean> {
    try {
      return this.repository.delete(index, id);
    } catch (error) {
      throw error;
    }
  }
}
