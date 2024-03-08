import { HttpException, HttpStatus } from '@nestjs/common';
import { Auth } from './auth.domain';

export interface Profile {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  photoUrl: string;
  phone: string;
  gender: string;
  category: string[];
  followers: string[];
  following: string[];
}

export interface ProfileRepository {
  get(id: string): Promise<Profile>;

  getAll(): Promise<Profile[]>;

  create(profile: Profile): Promise<boolean>;

  update(profile: Profile): Promise<boolean>;

  getAllAuthProfile(page: number): Promise<any>;
}

export interface ProfileUseCase {
  get(id: string): Promise<Profile>;

  getAll(): Promise<Profile[]>;

  create(profile: Profile): Promise<boolean>;

  update(profile: Profile): Promise<boolean>;

  getAllAuthProfile(page: number): Promise<any>;
}

export interface ProfileInterop {
  get(id: string, token: string): Promise<Profile>;

  getMine(token: string): Promise<Profile>;

  getAll(token: string): Promise<Profile[]>;

  create(profile: Profile, token: string): Promise<boolean>;

  update(profile: Profile, token: string): Promise<boolean>;

  follow(
    token: string,
    profileId: string,
    otherProfileId: string,
  ): Promise<boolean>;

  unfollow(
    token: string,
    profileId: string,
    otherProfileId: string,
  ): Promise<boolean>;

  getAllAuthProfile(token: string, page: number): Promise<any>;
}

export const ErrorProfileExists = new HttpException(
  'Profile already exists',
  HttpStatus.BAD_REQUEST,
);

export const ErrorProfileNotFound = new HttpException(
  'Profile not found',
  HttpStatus.NOT_FOUND,
);

export const ErrorIdEmpty = new HttpException(
  'Profile id is required',
  HttpStatus.BAD_REQUEST,
);

export const ErrorFieldEmpty = new HttpException(
  'Field is required',
  HttpStatus.BAD_REQUEST,
);
