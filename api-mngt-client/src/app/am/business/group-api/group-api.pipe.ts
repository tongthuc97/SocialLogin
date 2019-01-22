import { Injectable, Pipe, PipeTransform } from '@angular/core';

import { GroupApi } from './group-api';

// Định nghĩa môt pipe thực hiện chức năng sắp xếp
@Pipe({ name: 'orderGroupApi' })
@Injectable()
export class OrderGroupApiPipe implements PipeTransform {
/*
* hàm nhận 2 tham số truyền vào
*   key: tên thuộc tính cột sắp xếp
*   direction: chiều săp xếp
*/
  transform(groupApis: any, key: string, direction: number) : GroupApi[] {
    if (groupApis !==undefined && key && groupApis !== null && groupApis.length > 0) {
      groupApis.sort(
        (a: GroupApi, b: GroupApi) => {
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
    return groupApis;
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