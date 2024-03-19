import { Injectable } from '@nestjs/common';
import {
  ErrorProfileNotFound,
  Profile,
  ProfileRepository,
} from 'src/domain/profile.domain';
import * as admin from 'firebase-admin';
import { Auth } from '../../../domain/auth.domain';
import { PostDomain } from '../../../domain/post.domain';

@Injectable()
export class RepositoryService implements ProfileRepository {
  db: admin.firestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  async get(id: string): Promise<Profile> {
    return await this.db
      .collection('profiles')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data() as Profile;
        } else {
          throw ErrorProfileNotFound;
        }
      });
  }

  async getAll(): Promise<Profile[]> {
    return await this.db
      .collection('profiles')
      .get()
      .then((snapshot) => {
        let result: Profile[] = [];
        snapshot.forEach((doc) => {
          result.push(doc.data() as Profile);
        });
        return result;
      });
  }

  async getAllAuthProfile(page: number, size: number): Promise<any> {
    let auth = await this.db.collection('auths').get();
    let profile = await this.db.collection('profiles').get();
    let post = await this.db.collection('posts').get();
    let result: any[] = [];
    auth.forEach((doc) => {
      let data = doc.data() as Auth;
      let dataProfile = doc.data() as Profile;
      let dataPost = doc.data() as PostDomain;
      post.forEach((p) => {
        dataPost = p.data() as PostDomain;
      });
      let profileData = profile.docs.find((p) => p.id === data.id);
      let postData = post.docs.filter(
        (p) => dataProfile.id === dataPost.creatorId,
      );
      let count = 0;
      if (postData) {
        postData.forEach((p) => {
          count++;
        });
      }
      if (profileData) {
        result.push({
          ...data,
          ...profileData.data(),
          numberPost: count,
        });
      }
    });
    page = Math.ceil(result.length / size);
    return {
      data: result.slice((+page - 1) * size, +page * size),
      endPage: page,
    };
  }

  async getAllAuthNoProfile(page: number, size: number) {
    let auth = await this.db.collection('auths').get();
    let profile = await this.db.collection('profiles').get();
    let result: any[] = [];
    auth.forEach((doc) => {
      let data = doc.data() as Auth;
      let profileData = profile.docs.find((p) => p.id === data.id);
      if (!profileData) {
        result.push(data);
      }
    });
    page = Math.ceil(result.length / size);
    return {
      data: result.slice((+page - 1) * size, +page * size),
      endPage: page,
    };
  }

  async create(profile: Profile): Promise<boolean> {
    await this.db.collection('profiles').doc(profile.id).set(profile);
    return true;
  }

  async update(profile: Profile): Promise<boolean> {
    await this.db
      .collection('profiles')
      .doc(profile.id)
      .update({ ...profile });
    return true;
  }
}
