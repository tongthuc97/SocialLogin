import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { Application } from './application';

// Định nghĩa môt pipe thực hiện chức năng sắp xếp
@Pipe({ name: 'orderApplication' })
@Injectable()
export class OrderApplicationPipe implements PipeTransform {
/*
* hàm nhận 2 tham số truyền vào
*   key: tên thuộc tính cột sắp xếp
*   direction: chiều săp xếp
*/
  transform(applications: any, key: string, direction: number) : Application[] {
    if (applications !==undefined && key && applications !== null && applications.length > 0) {
      applications.sort(
        (a: Application, b: Application) => {
          const propertyA: number|string = this.getProperty(a, key);
          const propertyB: number|string = this.getProperty(b, key);
          if (propertyA < propertyB) {
            return -1 * direction ;
          } else if (propertyA > propertyB) {
            return 1 * direction;
          } else {
            return 0;
          }
        }
      );
    }
    return applications;
  }

   private getProperty (value: { [key: string]: any}, key: string): number|string {
    if (value == null || typeof value !== 'object') {
      return undefined;
    }

    const keys: string[] = key.split('.');
    let result: any = value[keys.shift()];

    for (const key of keys) {
      if (result == null) { // check null or undefined
        return undefined;
      }
      result = result[key];
    }
    return result;
  }
}