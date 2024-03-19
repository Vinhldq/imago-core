import { Inject, Injectable } from '@nestjs/common';
import {
  AllReport,
  Report,
  ReportRepository,
  ReportUseCase,
} from '../../../../domain/report.domain';

@Injectable()
export class BaseServiceUseCase implements ReportUseCase {
  constructor(
    @Inject('ReportRepository') private reportRepository: ReportRepository,
  ) {}

  create(report: Object) {
    this.reportRepository.create(report);
  }

  getAll(): Promise<Report[]> {
    return this.reportRepository.getAll();
  }

  getAllByStatusCompleted(page: number): Promise<AllReport> {
    return this.reportRepository.getAllByStatusCompleted(page);
  }

  getAllByStatusPending(page: number, type: string): Promise<AllReport> {
    return this.reportRepository.getAllByStatusPending(page, type);
  }

  update(id: string) {
    this.reportRepository.update(id);
  }
}