import { SearchTotalHits } from '@elastic/elasticsearch/lib/api/types';

export interface SearchResult<T> {
  items: T[];
  total: number | SearchTotalHits;
}

export interface SearchRepository<T> {
  search(index: string, query: string): Promise<SearchResult<T>>;
  create(index: string, item: T): Promise<boolean>;
  update(index: string, item: T): Promise<boolean>;
  delete(index: string, id: string): Promise<boolean>;
}

export interface SearchUseCase<T> {
  search(index: string, query: string): Promise<SearchResult<T>>;
  create(index: string, item: T): Promise<boolean>;
  update(index: string, item: T): Promise<boolean>;
  delete(index: string, id: string): Promise<boolean>;
}

export interface SearchInterop<T> {
  search(index: string, query: string): Promise<SearchResult<T>>;
  create(index: string, item: T): Promise<boolean>;
  update(index: string, item: T): Promise<boolean>;
  delete(index: string, id: string): Promise<boolean>;
}
