import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { take } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async gertAircraftInfo(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      console.log(this.address);
      this.httpService
        .get(
          `http://${this.address}/skyaware/data/aircraft.json?_=${new Date().getTime()}`,
        )
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            console.log(res.data)
            resolve(res.data);
          },
          (err) => {
            reject(err);
          },
        );
    });
  }

  private address = process.env.SENSOR_ADDRESS;
}
