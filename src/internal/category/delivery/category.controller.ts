import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Headers,
} from '@nestjs/common';
import {
  CategoryDomain,
  CategoryInterop,
} from '../../../domain/category.domain';

@Controller('v1/category')
export class CategoryController {
  constructor(@Inject('CategoryInterop') private interop: CategoryInterop) {}

  @Post()
  async createCategory(@Body() category: CategoryDomain) {
    try {
      await this.interop.createCategory(category);
    } catch (e) {
      throw e;
    }
  }

  @Put()
  async updateCategory(@Query() id: string ,@Body() category: CategoryDomain) {
    try {
      await this.interop.updateCategory(id,category);
    } catch (e) {
      throw e;
    }
  }

  @Delete()
  async deleteCategory(@Query('id') id: string) {
    try {
      return await this.interop.deleteCategory(id);
    } catch (e) {
      throw e;
    }
  }
  @Get()
  async getCategory(@Query('id') id: string) {
    try {
      return await this.interop.getCategory(id);
    } catch (e) {
      throw e;
    }
  }
  @Get('all')
  async getCategories(
    @Headers() headers: any,
    @Query('page') page: number,
  ) {
    let token = headers['authorization'];
    try {
      return await this.interop.getCategories(page, token);
    } catch (e) {
      throw e;
    }
  }
}
