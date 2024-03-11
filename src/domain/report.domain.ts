import { PostDomain } from './post.domain';
import { Profile } from './profile.domain';

export interface Report {
  type: string;
  reason: string[];
  status: string;
  id: string;
  typeInfo: Profile | PostDomain;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
}

export interface AllReport {
  data: Report[];
  endPage: number;
}

export interface ReportRepository {
  create(report: Object): any;

  update(id: string): any;

  getAll(): Promise<Report[]>;

  getAllByStatusCompleted(page: number): Promise<AllReport>;

  getAllByStatusPending(page: number, type: string): Promise<AllReport>;
}

export interface ReportUseCase {
  create(report: Object): any;

  update(id: string): any;

  getAll(): Promise<Report[]>;

  getAllByStatusCompleted(page: number): Promise<AllReport>;

  getAllByStatusPending(page: number, type: string): Promise<AllReport>;
}

export interface ReportInterop {
  create(token: string, report: Object): any;

  update(id: string, token: string): any;

  getAll(token: string): Promise<Report[]>;

  getAllByStatusCompleted(token: string, page: number): Promise<AllReport>;

  getAllByStatusPending(
    token: string,
    page: number,
    type: string,
  ): Promise<AllReport>;
}
