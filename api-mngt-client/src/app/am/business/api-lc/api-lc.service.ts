import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ApiLc } from './api-lc';
import { AppConfig } from '../../../app.config';

@Injectable()
export class ApiLcService {

  apiUrl = AppConfig.settings.baseUrl +  "apilcevents";
  jsonHeaders = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: Http,
  ) { }

  getListApiLc(): Promise<any>{
    var promise = this.http.get(this.apiUrl + "/list" )
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => error.json() as any);
    return promise;
  }

  getListApiLcByApiVersionId(apiVersionId: number): Promise<any>{
    var promise = this.http.get(this.apiUrl + "/list-by-api-version-id/" + apiVersionId )
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => error.json() as any);
    return promise;
  }

  getApiLcs(page:number): Promise<any> {
    var promise = this.http.get(this.apiUrl + "?page=" + page)
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => error.json() as any);
    return promise;
  }

  findOne(id: number): Promise<any> {
    var promise = this.http.get(this.apiUrl + "/" + id)
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
    return promise;
  }

  create(apiLc: ApiLc): Promise<any> {
    var promise = this.http.post(this.apiUrl + "/create",
      JSON.stringify(apiLc), { headers: this.jsonHeaders })
      .toPromise()
      .then(response => response.status as any)
      .catch(this.handleError);
    return promise;
  }

  update(apiLc: ApiLc): Promise<any> {
    var promise = this.http.put(this.apiUrl + "/update",
    apiLc, { headers: this.jsonHeaders })
      .toPromise()
      .then(response => response.status as any)
      .catch(this.handleError);
    return promise;
  }

  delete(apiLcId: number): Promise<any>{
    var promise = this.http.delete(this.apiUrl + "/delete/" 
            + apiLcId)
            .toPromise()
            .then(response => response.status as any)
            .catch(this.handleError)
    return promise;
  }

  filterSearch(apiLc: ApiLc, page: number): Promise<any>{
    var promise = this.http.put(this.apiUrl + "/advance-filter?page=" + page,
    apiLc, { headers: this.jsonHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
    return promise;
  }

  deleteAllBatch(entityIds: number[]): Promise<any>{
    var promise = this.http.delete(this.apiUrl + "/deleteAllBatch/" + entityIds)
      .toPromise()
      .then(response => response.status as any)
      .catch(this.handleError);
    return promise;
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.json());
  }
}