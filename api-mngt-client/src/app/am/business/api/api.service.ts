import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { CommonService } from '../../common/util/common-service/common.service';
import { Router } from '@angular/router';
import { HeaderField } from '../../common/util/header-field';
import { HeaderValue } from '../../common/util/header-value';
import { AppConfig } from '../../../app.config';

@Injectable()
export class ApiService extends CommonService {

  private apiApi = AppConfig.settings.baseUrl + "apis";
  private apiVersionApi = AppConfig.settings.baseUrl + "apiversions";

  constructor(
    private http: Http,
    router: Router
  ) {
    super(router)
  }

  getListApi(): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiApi + "/list", { headers: secureHeaders })
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
    var promise = this.http.get(this.apiApi + "/" + id, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  create(api): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.post(this.apiApi + "",
      api, { headers: secureHeaders })
      .toPromise()
      .then(response => response.status as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  delete(apiId: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.delete(this.apiVersionApi + "/delete/"
      + apiId, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
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

  findByContextTemplate(contextTemplate: String): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiApi + "/contextTemplate/" + contextTemplate + "/", { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

}
