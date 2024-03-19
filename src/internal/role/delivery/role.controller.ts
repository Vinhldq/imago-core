import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Inject,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Role, RoleInterop } from '../../../domain/role.domain';

@Controller('/v1/role')
export class RoleController {
  constructor(@Inject('RoleInterop') private roleInterop: RoleInterop) {}

  @Get('/all')
  getAllRole(
    @Headers() headers: any,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    let token = headers['authorization'];
    return this.roleInterop.getAllRole(token, page, size);
  }

  @Get('list')
  getListRole(
    @Headers() headers: any,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    let token = headers['authorization'];
    return this.roleInterop.getListRole(token, page, size);
  }

  @Post()
  createRole(@Headers() headers: any, @Body() role: Role) {
    let token = headers['authorization'];
    return this.roleInterop.createRole(token, role);
  }

  @Put()
  updateRole(
    @Headers() headers: any,
    @Query('id') id: string,
    @Body() role: Role,
  ) {
    let token = headers['authorization'];
    return this.roleInterop.updateRole(token, id, role);
  }

  @Delete()
  deleteRole(@Headers() headers: any, @Query('id') id: string) {
    let token = headers['authorization'];
    return this.roleInterop.deleteRole(token, id);
  }
}
