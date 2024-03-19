import { Inject, Injectable } from '@nestjs/common';
import { Auth, AuthUseCase } from 'src/domain/auth.domain';
import {
  ErrorIdEmpty,
  Profile,
  ProfileInterop,
  ProfileUseCase,
} from 'src/domain/profile.domain';
import { SearchResult, SearchUseCase } from 'src/domain/search.domain';

@Injectable()
export class InteropService implements ProfileInterop {
  constructor(
    @Inject('ProfileUseCase') private profileUseCase: ProfileUseCase,
    @Inject('AuthUseCase') private authUseCase: AuthUseCase,
    @Inject('SearchUseCase') private searchUseCase: SearchUseCase<Profile>,
  ) {}

  search(index: string, query: string): Promise<SearchResult<Profile>> {
    return this.searchUseCase.search(index, query);
  }

  async follow(
    token: string,
    profileId: string,
    otherProfileId: string,
  ): Promise<any> {
    try {
      await this.authUseCase.verifyToken(token);
      let profile = await this.profileUseCase.get(profileId);
      let otherProfile = await this.profileUseCase.get(otherProfileId);
      if (profile) {
        if (!this.isExisted(profile.following, otherProfileId)) {
          profile.following.push(otherProfileId);
          otherProfile.followers.push(profileId);
          await this.profileUseCase.update(profile);
          await this.searchUseCase.update('profiles', profile, profile.id);
          await this.profileUseCase.update(otherProfile);
          await this.searchUseCase.update(
            'profiles',
            otherProfile,
            otherProfile.id,
          );
        }
        if (this.isExisted(profile.following, otherProfileId)) {
          return;
        }
      } else {
        return;
      }
    } catch (error) {
      throw error;
    }
  }

  async unfollow(
    token: string,
    profileId: string,
    otherProfileId: string,
  ): Promise<any> {
    try {
      await this.authUseCase.verifyToken(token);
      let profile = await this.profileUseCase.get(profileId);
      let otherProfile = await this.profileUseCase.get(otherProfileId);
      if (profile) {
        if (this.isExisted(profile.following, otherProfileId)) {
          profile.following = profile.following.filter(
            (item) => item !== otherProfileId,
          );
          otherProfile.followers = otherProfile.followers.filter(
            (item) => item !== profileId,
          );
          await this.profileUseCase.update(profile);
          await this.searchUseCase.update('profiles', profile, profile.id);
          await this.profileUseCase.update(otherProfile);
          await this.searchUseCase.update(
            'profiles',
            otherProfile,
            otherProfile.id,
          );
        }
        if (!this.isExisted(profile.following, otherProfileId)) {
          return;
        }
      } else {
        return;
      }
    } catch (error) {
      throw error;
    }
  }

  isExisted(checkArray: string[], id: string): Boolean {
    for (let i = 0; i < checkArray.length; i++) {
      if (checkArray[i] === id) {
        return true;
      }
    }
    return false;
  }

  async create(profile: Profile, token: string): Promise<boolean> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      const profileData: Profile = {
        id: decodedToken.uid,
        email: decodedToken.email,
        bio: profile.bio || '',
        photoUrl: profile.photoUrl || '',
        phone: profile.phone || '',
        userName: profile.userName || '',
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        category: profile.category || [],
        followers: profile.followers || [],
        following: profile.following || [],
        gender: profile.gender || '',
      };
      await this.profileUseCase.create(profileData);
      await this.searchUseCase.create('profiles', profileData, profileData.id);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async update(profile: Profile, token: string): Promise<boolean> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      const _profile = await this.profileUseCase.get(decodedToken.uid);
      const profileData: Profile = {
        ..._profile,
        ...profile,
      };
      await this.profileUseCase.update(profileData);
      await this.searchUseCase.update('profiles', profileData, profileData.id);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async get(id: string, token: string): Promise<Profile> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      if (!id) {
        throw ErrorIdEmpty;
      }
      return await this.profileUseCase.get(id);
    } catch (error) {
      throw error;
    }
  }

  getAll(token: string): Promise<Profile[]> {
    try {
      const decodedToken = this.authUseCase.verifyToken(token);
      return this.profileUseCase.getAll();
    } catch (error) {
      throw error;
    }
  }

  async getAllAuthProfile(
    token: string,
    page: number,
    size: number,
  ): Promise<any> {
    try {
      await this.authUseCase.verifyToken(token);
      return this.profileUseCase.getAllAuthProfile(page, size);
    } catch (error) {
      throw error;
    }
  }

  async getAllAuthNoProfile(
    token: string,
    page: number,
    size: number,
  ): Promise<any> {
    try {
      await this.authUseCase.verifyToken(token);
      return this.profileUseCase.getAllAuthNoProfile(page, size);
    } catch (error) {
      throw error;
    }
  }

  async getMine(token: string): Promise<Profile> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      return this.profileUseCase.get(decodedToken.uid);
    } catch (error) {
      throw error;
    }
  }

  //get all profiles except mine profile
  async getAllExceptMine(token: string): Promise<Profile[]> {
    try {
      const decodedToken = await this.authUseCase.verifyToken(token);
      const profile = await this.profileUseCase.get(decodedToken.uid);
      return this.profileUseCase.getAll().then((profiles) => {
        return profiles.filter((item) => item.id !== profile.id);
      });
    } catch (error) {
      throw error;
    }
  }
}
