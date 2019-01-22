import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { AppConfig } from '../../../../../app.config';


@Injectable()
export class ApiLifecycleService {

  apiUrl = AppConfig.settings.baseUrl +  "apiversions";
  jsonHeaders = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: Http,
  ) { }

  getListApiLifecycleByApiVersionId(apiVersionId: number): Promise<any>{
    var promise = this.http.get(this.apiUrl + "/list-by-api-version-id/" + apiVersionId )
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => error.json() as any);
    return promise;
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.json());
  }
}