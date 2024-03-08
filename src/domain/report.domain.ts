export interface Report {
  type: string;
  reason: string[];
  status: string;
  id: string;
  typeId: string;
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

  getAllByStatusCompleted(page: number): Promise<AllReport>;

  getAllByStatusPending(page: number): Promise<AllReport>;
}

export interface ReportUseCase {
  create(report: Object): any;

  update(id: string): any;

  getAllByStatusCompleted(page: number): Promise<AllReport>;

  getAllByStatusPending(page: number): Promise<AllReport>;
}

export interface ReportInterop {
  create(token: string, report: Object): any;

  update(id: string, token: string): any;

  getAllByStatusCompleted(token: string, page: number): Promise<AllReport>;

  getAllByStatusPending(token: string, page: number): Promise<AllReport>;
}
