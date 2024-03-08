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

  getAllByStatusCompleted(page: number): Promise<AllReport> {
    return this.reportRepository.getAllByStatusCompleted(page);
  }

  getAllByStatusPending(page: number): Promise<AllReport> {
    return this.reportRepository.getAllByStatusPending(page);
  }

  update(id: string) {
    this.reportRepository.update(id);
  }
}
