import { Injectable } from '@nestjs/common';
import { SearchRepository, SearchResult } from 'src/domain/search.domain';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class BaseRepositoryService<T> implements SearchRepository<T> {
  private client: Client;

  constructor() {
    this.client = new Client({ node: 'http://localhost:9200' });
  }
  async create(index: string, item: T): Promise<boolean> {
    let result = await this.client.index({
      index: index,
      body: item,
    });
    return true;
  }
  async update(index: string, item: T): Promise<boolean> {
    let result = await this.client.index({
      index: index,
      body: item,
    });
    return true;
  }
  async delete(index: string, id: string): Promise<boolean> {
    let result = await this.client.delete({
      index: index,
      id: id,
    });
    return true;
  }

  async search(index: string, query: string): Promise<SearchResult<T>> {
    let result = await this.client.search({
      index: index,
      body: {
        query: {
          query_string: {
            query: query,
          },
        },
      },
    });
    return {
      items: result.hits.hits.map((item: any) => item._source),
      total: result.hits.total ?? 0,
    };
  }
}
