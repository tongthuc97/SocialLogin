import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CommonService } from '../../../../common/util/common-service/common.service';
import { Router } from '@angular/router';
import { HeaderField } from '../../../../common/util/header-field';
import { HeaderValue } from '../../../../common/util/header-value';
import { AppConfig } from '../../../../../app.config';


@Injectable()
export class ConditionGroupService extends CommonService {
  policyApi = AppConfig.settings.baseUrl + "policies";
  conditionGroupApi = this.policyApi + "/conditionGroups";

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
    var promise = this.http.get(this.conditionGroupApi + "?page=" + page, { headers: secureHeaders })
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
    var promise = this.http.get(this.conditionGroupApi + "/" + id, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  create(policyId: number, conditionGroup): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.post(this.policyApi + "/" + policyId + "/conditionGroups/create",
      JSON.stringify(conditionGroup), { headers: secureHeaders })
      .toPromise()
      .then(response => response as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  update(conditionGroup): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.put(this.conditionGroupApi + "/update",
      conditionGroup, { headers: secureHeaders })
      .toPromise()
      .then(response => response as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  delete(conditionGroupId: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.delete(this.conditionGroupApi + "/delete/"
      + conditionGroupId, { headers: secureHeaders })
      .toPromise()
      .then(response => response as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  filterSearch(conditionGroup, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.put(this.conditionGroupApi + "/advance-filter?page=" + page,
      conditionGroup, { headers: secureHeaders })
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
    var promise = this.http.delete(this.conditionGroupApi + "/deleteAllBatch/" + entityIds, { headers: secureHeaders })
      .toPromise()
      .then(response => response as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  hasConditionGroupWithName(conditionGroupName: string): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    return this.http
      .get(this.conditionGroupApi + "/hasName/" + conditionGroupName, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
  }

}
