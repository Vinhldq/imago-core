import { Injectable } from '@nestjs/common';
import {
  PostDomain,
  PostRepository,
  PostResponse,
} from '../../../../domain/post.domain';
import * as admin from 'firebase-admin';
import { Profile } from 'src/domain/profile.domain';

@Injectable()
export class BaseRepositoryService implements PostRepository {
  private db: admin.firestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }
  async getProfilePost(page: number, size: number): Promise<any> {
    let post = await this.db.collection('posts').get();
    let profile = await this.db.collection('profiles').get();
    let result: any[] = [];
    post.forEach((doc) => {
      let data = doc.data() as PostDomain;
      let profileData = profile.docs.find((p) => p.id === data.creatorId);
      if (profileData) {
        result.push({
          ...data,
          profile: profileData.data(),
        });
      }
    });
    return {
      data: result.slice((page - 1) * size, page * size),
      endPage: Math.ceil(result.length / size),
    };
  }

  async getDetail(id: string): Promise<PostDomain> {
    const post = await this.db.collection('posts').doc(id).get();
    console.log(id);

    return post.data() as PostDomain;
  }

  async getByMentionId(
    mention: string,
    page: number,
    size: number,
  ): Promise<PostResponse> {
    try {
      const postsRef = this.db.collection('posts');
      const query = postsRef.where('mention', 'array-contains', mention);
      const snapshot = await query.get();
      const posts = snapshot.docs.map((doc) => doc.data() as PostDomain);
      return {
        data: posts.slice((page - 1) * size, page * size),
        endPage: Math.ceil(posts.length / size),
      };
    } catch (e) {
      throw e;
    }
  }

  async getAllPost(page: number, size: number): Promise<PostResponse> {
    try {
      const postRef = this.db.collection('posts');
      const query = postRef.orderBy('createdAt', 'desc');

      return query.get().then((snapshot) => {
        const posts = snapshot.docs.map((doc) => doc.data() as PostDomain);
        return {
          data: posts.slice((page - 1) * size, page * size),
          endPage: Math.ceil(posts.length / size),
        };
      });
    } catch (e) {
      throw e;
    }
  }

  async getAllByUid(
    creatorId: string,
    page: number,
    size: number,
  ): Promise<PostResponse> {
    const postRef = this.db.collection('posts');
    const query = postRef.where('creatorId', '==', creatorId);
    const snapshot = await query.get();
    const posts = snapshot.docs.map((doc) => doc.data() as PostDomain);
    return {
      data: posts.slice((page - 1) * size, page * size),
      endPage: Math.ceil(posts.length / size),
    };
  }

  async getMine(id: string, page: number, size: number): Promise<PostResponse> {
    const postsRef = this.db.collection('posts');
    const query = postsRef.where('creatorId', '==', id);
    const snapshot = await query.get();
    const post = snapshot.docs.map((doc) => doc.data() as PostDomain);
    return {
      data: post.slice((page - 1) * size, page * size),
      endPage: Math.ceil(post.length / size),
    };
  }

  async getShare(
    shareId: string,
    page: number,
    size: number,
  ): Promise<PostResponse> {
    const postsRef = this.db.collection('posts');
    const query = postsRef.where('share', 'array-contains', shareId);
    const snapshot = await query.get();
    const posts = snapshot.docs.map((doc) => doc.data() as PostDomain);
    return {
      data: posts.slice((page - 1) * size, page * size),
      endPage: Math.ceil(posts.length / size),
    };
  }

  async getByCateId(
    id: string,
    page: number,
    size: number,
  ): Promise<PostResponse> {
    const postsRef = this.db.collection('posts');
    const query = postsRef.where('cateId', 'array-contains', id);
    const snapshot = await query.get();
    const posts = snapshot.docs.map((doc) => doc.data() as PostDomain);
    return {
      data: posts.slice((page - 1) * size, page * size),
      endPage: Math.ceil(posts.length / size),
    };
  }

  async create(post: PostDomain): Promise<any> {
    try {
      await this.db.collection('posts').doc(post.id).set(post);
      return true;
    } catch (e) {
      throw e;
    }
  }

  async update(post: PostDomain): Promise<any> {
    try {
      await this.db.collection('posts').doc(post.id).set(post);
      return true;
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string): Promise<any> {
    try {
      await this.db.collection('posts').doc(id).delete();
      return 'Delete success';
    } catch (e) {
      throw e;
    }
  }
}
