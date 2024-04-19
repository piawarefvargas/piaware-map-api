import {
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('aircraft')
  async gertAircraftInfo(): Promise<any> {
    try {
      const response = await this.appService.gertAircraftInfo();
      return response;
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: {
          code: error.code ? error.code : error,
          message: error.message ? error.message : error,
        },
      });
    }
  }

  @Get('flight/:id')
  async getFligthInfo(@Param('id') id: string): Promise<any> {
    try {
      const response = await this.appService.getFligthInfo(id);
      return response;
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: {
          code: error.code ? error.code : error,
          message: error.message ? error.message : error,
        },
      });
    }
  }
}
