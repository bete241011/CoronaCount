import { Injectable } from '@angular/core';

/*
  Generated class for the DeviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeviceProvider {

  deviceWidth: number;
  deviceHeight: number;

  constructor() {
    console.log('Hello DeviceProvider Provider');
  }

  setWidthAndHeight(width, height): void{
    this.deviceWidth = width;
    this.deviceHeight = height;
  }

}
