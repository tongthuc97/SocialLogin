import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { CommonService } from '../../common/util/common-service/common.service';
import { Router } from '@angular/router';
import { HeaderField } from '../../common/util/header-field';
import { HeaderValue } from '../../common/util/header-value';
import { AppConfig } from '../../../app.config';

@Injectable()
export class ActionHistoryService extends CommonService {

  actionHistoryApi = AppConfig.settings.baseUrl + "actionhistories";

  constructor(
    private http: Http,
    router: Router
  ) {
    super(router)
  }

  findAll(page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.actionHistoryApi + "?page=" + page, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
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
    var promise = this.http.get(this.actionHistoryApi + "/" + id, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  filterSearch(actionHistory: any, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.put(this.actionHistoryApi + "/advance-filter?page=" + page,
      actionHistory, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }
}
