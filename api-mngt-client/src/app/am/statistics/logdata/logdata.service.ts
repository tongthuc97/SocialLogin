import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';
import { CommonService } from '../../common/util/common-service/common.service';
import { HeaderField } from '../../common/util/header-field';
import { HeaderValue } from '../../common/util/header-value';
import { AppConfig } from '../../../app.config';
import { Contants } from '../common/contants';


/**
 * Examine the handling  of business requirements with logdata module
 */
@Injectable()
export class LogdataService extends CommonService {
  /**  the api url */
  apiUrl = AppConfig.settings.baseUrl + "logdatas";

  constructor(
    private http: Http,
    router: Router
  ) {
    super(router)
  }

  /**
   * @description get page logdata
   * @param page the paging restriction
   */
  getLogdatas(page: number, size: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiUrl + "?page=" + page + '&size=10', { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
   * @description get page logdata
   * @param searchObject the search restriction
   * @param page the paging restriction
   */
  filterSearch(searchObject: any, page: number, size: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiUrl + '?search=' + encodeURI(JSON.stringify(searchObject)) + '&page=' + page + '&size=10',
      { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
   * @description hàm trả về thông tin 1 logdata
   * @param id id của logdata
   */
  findOne(id: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiUrl + "/" + id, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
   * @description get ApiVersion Usage Time For Dashboard
   */
  getApiVersionUsageTimeForDashboard(): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiUrl + "/dashboard/apiusage", { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
    * @description get Api Last Access Time For Dashboard
    */
  getApiLastAccessTimeForDashboard(): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiUrl + "/dashboard/api-lastaccess", { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
   * @description get list apiUsage
   */
  getApiUsage(searchObject: any, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiUrl + '/statistic/apiusage?search=' + encodeURI(JSON.stringify(searchObject)) + '&page=' + page + "&size="+Contants.PAGE_SIZE
      , { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
   * @description get list ApiUsedByApplication
   */
  getApiUsedByApplication(searchObject: any, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiUrl + "/statistic/application-used?search=" + encodeURI(JSON.stringify(searchObject)) + "&page=" + page + "&size=10"
      , { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
    * @description get list ApiLastAccessTime
    */
  getApiLastAccessTime(searchObject: any, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiUrl + "/statistic/api-lastaccess?search=" + encodeURI(JSON.stringify(searchObject)) + "&page=" + page + "&size=10"
      , { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
    * @description get list ApiUsageResult
    */
  getApiUsageResult(searchObject: any, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiUrl + "/statistic/result-api-usage?search=" + encodeURI(JSON.stringify(searchObject)) + "&page=" + page + "&size=10"
      , { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
   * @description get list ApiResponseTime
   */
  getApiResponseTime(searchObject: any, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiUrl + "/statistic/api-response-time?search=" + encodeURI(JSON.stringify(searchObject)) + "&page=" + page + "&size=10"
      , { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
   * @description get list ApiMethodUsage
   */
  getApiMethodUsage(searchObject: any, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiUrl + "/statistic/api-method?search=" + encodeURI(JSON.stringify(searchObject)) + "&page=" + page + "&size=10"
      , { headers: secureHeaders })
      .toPromise()
      .then(response => response.json().data as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }


}