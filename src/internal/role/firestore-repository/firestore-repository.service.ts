import { Injectable } from '@nestjs/common';
import {
  Role,
  RolePagination,
  RoleRepository,
  searchRoleEmpty,
} from '../../../domain/role.domain';
import * as admin from 'firebase-admin';
import { Auth } from '../../../domain/auth.domain';

@Injectable()
export class FirestoreRepositoryService implements RoleRepository {
  db = admin.firestore();

  constructor() {
    this.db = admin.firestore();
  }

  async getAllRole(page: number, size: number): Promise<RolePagination> {
    const roleRef = this.db.collection('roles');
    const snapshot = await roleRef.get();
    const roles = snapshot.docs.map((doc) => doc.data() as Role);
    return {
      data: roles.slice((page - 1) * size, page * size),
      endPage: Math.ceil(roles.length / size),
    };
  }

  async getListRole(page: number, size: number): Promise<any> {
    let auth = await this.db.collection('auths').get();
    let profile = await this.db.collection('profiles').get();
    let result: any[] = [];
    auth.forEach((doc) => {
      let data = doc.data() as Auth;
      let profileData = profile.docs.find((p) => p.id === data.id);
      if (data.role === 'admin') {
        if (profileData) {
          result.push({
            ...data,
            profile: profileData.data(),
          });
        }
      }
    });
    page = Math.ceil(result.length / size);
    return {
      data: result.slice((+page - 1) * size, +page * size),
      endPage: page,
    };
  }

  async createRole(role: Role): Promise<admin.firestore.WriteResult> {
    return await this.db.collection('roles').doc(role.id).set(role);
  }

  async updateRole(
    id: string,
    role: Partial<Role>,
  ): Promise<admin.firestore.WriteResult> {
    role.id = id;
    return await this.db.collection('roles').doc(id).update(role);
  }

  deleteRole(id: string): Promise<admin.firestore.WriteResult> {
    return this.db.collection('roles').doc(id).delete();
  }
}
