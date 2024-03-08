import {
  Controller,
  Get,
  Inject,
  Headers,
  Post,
  Put,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { Report, ReportInterop } from '../../domain/report.domain';

@Controller('v1/report')
export class ReportController {
  constructor(@Inject('ReportInterop') private interop: ReportInterop) {}

  @Get('completed')
  async getAllReportCompleted(
    @Headers() headers: any,
    @Query('page') page: number,
  ) {
    return this.interop.getAllByStatusCompleted(headers['authorization'], page);
  }

  @Get('pending')
  async getAllReportPending(
    @Headers() headers: any,
    @Query('page') page: number,
  ) {
    return this.interop.getAllByStatusPending(headers['authorization'], page);
  }

  @Post()
  async createReport(@Body() report: Report, @Headers() headers: any) {
    return this.interop.create(headers['authorization'], report);
  }

  @Put()
  async updateReport(@Headers() headers: any, @Query('id') id: string) {
    return this.interop.update(id, headers['authorization']);
  }
}
