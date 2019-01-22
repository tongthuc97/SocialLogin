
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { CommonService } from '../../common/util/common-service/common.service';
import { Router } from '@angular/router';
import { HeaderField } from '../../common/util/header-field';
import { HeaderValue } from '../../common/util/header-value';
import { AppConfig } from '../../../app.config';
@Injectable()
export class PolicyService extends CommonService {

  policyApi = AppConfig.settings.baseUrl + 'policies';
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
    const promise = this.http.get(this.policyApi + '?page=' + page, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  // getListPolicy(): Promise<any> {
  //   let accessToken = this.getAccessToken();
  //   var secureHeaders = new Headers();
  //   secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
  //   secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
  //   var promise = this.http.get(this.policyApi + "/list", { headers: secureHeaders })
  //     .toPromise()
  //     .then(response => response.json().data as any)
  //     .catch(error => {
  //       return this.handleError(error);
  //     });
  //   return promise;
  // }

  getListPolicyByPolicyType(policyType: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.policyApi + "/list?policyType=" + policyType, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  getApiPolicy(): Promise<any> {
    return this.getListPolicyByPolicyType(2);
  }

  getMethodPolicy(): Promise<any> {
    return this.getListPolicyByPolicyType(5);
  }

  // getPolicyBySubscription(): Promise<any> {
  //   let accessToken = this.getAccessToken();
  //   var secureHeaders = new Headers();
  //   secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
  //   secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
  //   var promise = this.http.get(this.policyApi + "/list?policyType=4", { headers: secureHeaders })
  //     .toPromise()
  //     .then(response => response.json().data as any)
  //     .catch(error => {
  //       return this.handleError(error);
  //     });
  //   return promise;
  // }

  findOne(policyId: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    const promise = this.http.get(
      this.policyApi + '/' + policyId, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  create(policy): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    const promise = this.http.post(this.policyApi,
      JSON.stringify(policy), { headers: secureHeaders })
      .toPromise()
      .then(response => response as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  update(policy): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    const promise = this.http.put(this.policyApi,
      policy, { headers: secureHeaders })
      .toPromise()
      .then(response => response as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  delete(policyId: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    const promise = this.http.delete(this.policyApi + '/' + policyId, { headers: secureHeaders })
      .toPromise()
      .then(response => response as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  filterSearch(policy, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    const promise = this.http.get(this.policyApi + "?search=" + encodeURI(JSON.stringify(policy)) + '&page=' + page
      , { headers: secureHeaders })
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
    const promise = this.http.delete(this.policyApi + '?entityIds=' + entityIds, { headers: secureHeaders })
      .toPromise()
      .then(response => response as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  findByPolicyTypeAndIsDeployed(policyType: number, isDeployed: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.policyApi + '/list?policyType=' + policyType, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }
}



