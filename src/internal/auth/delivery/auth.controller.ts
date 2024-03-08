import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Auth, AuthInterop } from '../../../domain/auth.domain';

@Controller('v1/auth')
export class AuthController {
  constructor(@Inject('AuthInterop') private authInterop: AuthInterop) {}

  @Post()
  async signUp(@Headers() headers: any): Promise<Auth> {
    let token = headers['authorization'];
    return await this.authInterop.signUp(token);
  }

  @Get('list')
  async getAll(@Headers() headers: any): Promise<Auth[]> {
    let token = headers['authorization'];
    return await this.authInterop.getAll(token);
  }

  @Get()
  async getById(
    @Headers() headers: any,
    @Query('id') id: string,
  ): Promise<Auth> {
    let token = headers['authorization'];
    return await this.authInterop.getById(id, token);
  }

  @Put('role')
  async changeRole(
    @Headers() headers: any,
    @Query('id') id: string,
    @Query('role') role: string,
  ): Promise<Auth> {
    let token = headers['authorization'];
    return await this.authInterop.changeRole(token, id, role);
  }

  @Put('block')
  async block(@Headers() headers: any, @Query('id') id: string): Promise<Auth> {
    let token = headers['authorization'];
    return await this.authInterop.block(token, id);
  }
}
