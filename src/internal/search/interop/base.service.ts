import { Inject, Injectable } from '@nestjs/common';
import { SearchInterop, SearchResult } from 'src/domain/search.domain';

@Injectable()
export class BaseInteropService<T> implements SearchInterop<T> {
  constructor(@Inject('SearchUseCase') private usecase: SearchInterop<T>) {}

  search(index: string, query: string): Promise<SearchResult<T>> {
    try {
      return this.usecase.search(index, query);
    } catch (error) {
      throw error;
    }
  }
  create(index: string, item: T, id: string): Promise<boolean> {
    try {
      return this.usecase.create(index, item, id);
    } catch (error) {
      throw error;
    }
  }
  update(index: string, item: T, id: string): Promise<boolean> {
    try {
      return this.usecase.update(index, item, id);
    } catch (error) {
      throw error;
    }
  }
  delete(index: string, id: string): Promise<boolean> {
    try {
      return this.usecase.delete(index, id);
    } catch (error) {
      throw error;
    }
  }
}
