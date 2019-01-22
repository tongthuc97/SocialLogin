import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { CommonService } from '../../../../common/util/common-service/common.service';
import { Router } from '@angular/router';
import { HeaderField } from '../../../../common/util/header-field';
import { HeaderValue } from '../../../../common/util/header-value';
import { ApiVersion } from './api-version';
import { AppConfig } from '../../../../../app.config';

@Injectable()
export class ApiVersionService extends CommonService {

  private apiApi = AppConfig.settings.baseUrl + "apis";

  private apiVersionApi = AppConfig.settings.baseUrl + "apiversions";

  constructor(
    private http: Http,
    router: Router
  ) {
    super(router)
  }

  getPageApiVersion(page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiVersionApi + '?page=' + page, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  filterSearchApiVersion(filter: string, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiVersionApi + '?filter=' + filter + '&page=' + page, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  advanceSearchApiVersion(searchObject: ApiVersion, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiVersionApi + '?search=' + encodeURI(JSON.stringify(searchObject)) + '&page=' + page, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  getListApiVersion(): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    const promise = this.http.get(this.apiVersionApi + '/list', { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  getListApiVersionByApiId(apiId: number) {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    const promise = this.http.get(this.apiApi + '/' + apiId + '/list', { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  getListForApplication(applicationId: number) {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    const promise = this.http.get(this.apiVersionApi + '/listForApplication/' + applicationId, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  findOne(id: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiVersionApi + "/" + id, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }


  delete(apiVersionId: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.delete(this.apiVersionApi + "/delete/"
      + apiVersionId, { headers: secureHeaders })
      .toPromise()
      .then(response => response.status as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  deleteAllBatch(entityIds: number[]): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.delete(this.apiVersionApi + "/deleteAllBatch/" + entityIds, { headers: secureHeaders })
      .toPromise()
      .then(response => response.status as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  createApiVersion(apiVersion): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.post(this.apiVersionApi + "/create-api-version",
      JSON.stringify(apiVersion), { headers: secureHeaders })
      .toPromise()
      .then(response => response.status as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  updateApiVersion(apiVersion): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.put(this.apiVersionApi + "/update-api-version",
      apiVersion, { headers: secureHeaders })
      .toPromise()
      .then(response => response.status as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  findByContextTemplateAndVersion(versionId: number, apiVersion: string): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiVersionApi + "/apiversionId/" + versionId + "/version/" + apiVersion + "/", { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  updateStateApi(apiVersionId: number, state: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.put(this.apiVersionApi + "/" + apiVersionId + "/currentState/" + state, { headers: secureHeaders })
      .toPromise()
      .then(response => response.status as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

}
