import { Inject, Injectable } from '@nestjs/common';
import { SearchInterop, SearchResult } from 'src/domain/search.domain';

@Injectable()
export class BaseInteropService<T> implements SearchInterop<T> {
  constructor(@Inject('SearchUseCase') private usecase: SearchInterop<T>) {}

  search(index: string, query: string): Promise<SearchResult<T>> {
    return this.usecase.search(index, query);
  }
  create(index: string, item: T): Promise<boolean> {
    return this.usecase.create(index, item);
  }
  update(index: string, item: T): Promise<boolean> {
    return this.usecase.update(index, item);
  }
  delete(index: string, id: string): Promise<boolean> {
    return this.usecase.delete(index, id);
  }
}
