import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as dayjs from 'dayjs';
import { take } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async gertAircraftInfo(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.logger.log(`client ip: ${this.address}`);
      this.httpService
        .get(
          `http://${this.address}/skyaware/data/aircraft.json?_=${new Date().getTime()}`,
        )
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            resolve(res.data);
          },
          (err) => {
            reject(err);
          },
        );
    });
  }

  async getFligthInfo(flightNumber: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const dayStart = dayjs().format('YYYY-MM-DD');
      this.logger.log(`day validation: ${dayStart}`);
      this.httpService
        .get(
          `https://aeroapi.flightaware.com/aeroapi/flights/${flightNumber}?start=${dayStart}`,
          {
            headers: {
              Accept: 'application/json; charset=UTF-8',
              'x-apikey': this.apiKeyAeroapi,
            },
          },
        )
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            resolve(res.data);
          },
          (err) => {
            reject(err);
          },
        );
    });
  }

  private address = process.env.SENSOR_ADDRESS;

  private apiKeyAeroapi = process.env.AEROAPI_API_KEY;

  private readonly logger = new Logger(AppService.name);
}
