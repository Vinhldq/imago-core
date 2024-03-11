import { Inject, Injectable } from '@nestjs/common';
import {
  AllReport,
  Report,
  ReportInterop,
  ReportUseCase,
} from '../../../../domain/report.domain';
import { AuthUseCase } from '../../../../domain/auth.domain';

@Injectable()
export class BaseServiceInterop implements ReportInterop {
  constructor(
    @Inject('ReportUseCase') private useCase: ReportUseCase,
    @Inject('AuthUseCase') private authUseCase: AuthUseCase,
  ) {}

  async create(token: string, report: Object) {
    try {
      await this.authUseCase.verifyToken(token);
      this.useCase.create(report);
    } catch (e) {
      throw e;
    }
  }

  async getAll(token: string): Promise<Report[]> {
    try {
      await this.authUseCase.verifyToken(token);
      return this.useCase.getAll();
    } catch (e) {
      throw e;
    }
  }

  async getAllByStatusCompleted(
    token: string,
    page: number,
  ): Promise<AllReport> {
    try {
      await this.authUseCase.verifyToken(token);
      return this.useCase.getAllByStatusCompleted(page);
    } catch (e) {
      throw e;
    }
  }

  async getAllByStatusPending(
    token: string,
    page: number,
    type: string,
  ): Promise<AllReport> {
    try {
      await this.authUseCase.verifyToken(token);
      return this.useCase.getAllByStatusPending(page, type);
    } catch (e) {
      throw e;
    }
  }

  async update(id: string, token: string) {
    try {
      await this.authUseCase.verifyToken(token);
      this.useCase.update(id);
    } catch (e) {
      throw e;
    }
  }
}
