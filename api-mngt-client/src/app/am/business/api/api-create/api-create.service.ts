import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { CommonService } from '../../../common/util/common-service/common.service';
import { Router } from '@angular/router';

@Injectable()
export class CreateApiService extends CommonService {

  constructor(
    private http: Http,
    router: Router
  ) {
    super(router)
  }

  getSwaggerUrl(swaggerUrl: string): Promise<any> {
    var promise = this.http.get(swaggerUrl)
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  getWsdlUrl(swaggerUrl: string): Promise<any> {
    var promise = this.http.get(swaggerUrl)
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

}