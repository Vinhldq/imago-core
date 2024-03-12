import { Injectable } from '@nestjs/common';
import { SearchRepository, SearchResult } from 'src/domain/search.domain';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class BaseRepositoryService<T> implements SearchRepository<T> {
  private client: Client;

  constructor() {
    this.client = new Client({ node: 'http://172.16.0.148:9200' });
  }
  async create(index: string, item: T, id: string): Promise<boolean> {
    try {
      let result = await this.client.index({
        index: index,
        body: item,
        id: id,
      });
      if (result.result === 'created') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Elastic request failed on index', error);
      throw error;
    }
  }
  async update(index: string, item: T, id: string): Promise<boolean> {
    try {
      let result = await this.client.index({
        index: index,
        body: item,
        id: id,
      });
      if (result.result === 'updated') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Elastic request failed on index', error);
      throw error;
    }
  }
  async delete(index: string, id: string): Promise<boolean> {
    try {
      let result = await this.client.delete({
        index: index,
        id: id,
      });
      if (result.result === 'deleted') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Elastic request failed on index', error);
      throw error;
    }
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
        from: 0,
        size: 100,
      },
    });
    return {
      items: result.hits.hits.map((item: any) => item._source),
      total: result.hits.total ?? 0,
    };
  }
}
