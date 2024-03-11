import { Inject, Injectable } from '@nestjs/common';
import { SearchResult, SearchUseCase } from 'src/domain/search.domain';

@Injectable()
export class BaseUseCaseService<T> implements SearchUseCase<T> {
  constructor(
    @Inject('SearchRepository') private repository: SearchUseCase<T>,
  ) {}

  search(index: string, query: string): Promise<SearchResult<T>> {
    return this.repository.search(index, query);
  }
  create(index: string, item: T): Promise<boolean> {
    return this.repository.create(index, item);
  }
  update(index: string, item: T): Promise<boolean> {
    return this.repository.update(index, item);
  }
  delete(index: string, id: string): Promise<boolean> {
    return this.repository.delete(index, id);
  }
}
