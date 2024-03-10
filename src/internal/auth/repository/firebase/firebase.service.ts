import { Injectable } from '@nestjs/common';
import * as assmin from 'firebase-admin';
import {
  Auth,
  AuthRepository,
  ErrorAccountNotFound,
  ErrorInvalidToken,
  ErrorUnauthorized,
} from '../../../../domain/auth.domain';
import { DecodedIdToken } from 'firebase-admin/lib/auth';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements AuthRepository {
  auth: assmin.auth.Auth;
  db = admin.firestore();
  constructor() {
    this.auth = assmin.auth();
  }

  async verifyToken(token: string): Promise<DecodedIdToken> {
    try {
      const decodedToken = await this.auth.verifyIdToken(token);

      if (!decodedToken) {
        throw ErrorInvalidToken;
      }
      return decodedToken;
    } catch (error) {
      throw ErrorUnauthorized;
    }
  }

  async create(account: Auth): Promise<Auth> {
    await this.db.collection('auths').doc(account.id).set(account);
    return account;
  }

  async getAll(): Promise<Auth[]> {
    return await this.db
      .collection('auths')
      .get()
      .then((snapshot) => {
        let result: Auth[] = [];
        snapshot.forEach((doc) => {
          result.push(doc.data() as Auth);
        });
        return result;
      });
  }

  async getById(id: string): Promise<Auth> {
    return await this.db
      .collection('auths')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data() as Auth;
        } else {
          throw ErrorAccountNotFound;
        }
      });
  }

  async update(account: Auth): Promise<Auth> {
    await this.db
      .collection('auths')
      .doc(account.id)
      .update({ ...account });
    return account;
  }
}
