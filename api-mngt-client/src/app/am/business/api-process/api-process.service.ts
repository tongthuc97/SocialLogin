import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { CommonService } from '../../common/util/common-service/common.service';
import { HeaderField } from '../../common/util/header-field';
import { HeaderValue } from '../../common/util/header-value';
import { Router } from '@angular/router';
import { AppConfig } from '../../../app.config';

/**
 * Examine the handling  of business requirements with api lifecycle module
 */
@Injectable()
export class ApiProcessService extends CommonService {

  apiVersionApi = AppConfig.settings.baseUrl + "apiversions";

  constructor(
    private http: Http,
    router: Router
  ) {
    super(router)
  }

  getListTask(page: number): Promise<any> {
    debugger;
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiVersionApi + "/list-task", { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  getTaskData(taskId: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiVersionApi + "/list-task/" + taskId, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
   * @returns a page of lifeCycleEvent meeting the paging restriction
   * @param apiVersionId: the id of the apiVersion
   * @param page the page info
   */
  getLifeCycleEven(apiVersionId: number, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiVersionApi + "/" + apiVersionId + "/ApiLcEvent?page=" + page
      , { headers: secureHeaders })
      .toPromise()
      .then(response => response.json())
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
   * @returns the current state of the api version
   * @param apiVersionId the id of the api version
   */
  getCurrentState(apiVersionId: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiVersionApi + "/" + apiVersionId + "/currentState"
      , { headers: secureHeaders })
      .toPromise()
      .then(response => response.text())
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
   * @returns the next state of the api version
   * @param apiVersionId the id of the api version
   */
  getNextState(apiVersionId: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.apiVersionApi + "/" + apiVersionId + "/nextState"
      , { headers: secureHeaders })
      .toPromise()
      .then(response => response.json())
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
   * update the state for api version
   * @param apiVersionState the new state of the api version
   */
  updateStateApi(apiVersionState: any): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.put(this.apiVersionApi + "/currentState", apiVersionState, { headers: secureHeaders })
      .toPromise()
      .then(response => response.status as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  processMultipleTask(taskMultiple: any): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.put(this.apiVersionApi + "/processMultipleTask", taskMultiple, { headers: secureHeaders })
      .toPromise()
      .then(response => response.status as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
   * initialization of a process for apiversion
   * @param apiVersionId the id of the api version
   */
  processInstance(apiVersionId: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.post(this.apiVersionApi + "/start-process/" + apiVersionId, "", { headers: secureHeaders })
      .toPromise()
      .then(response => response.status as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

}