import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { CommonService } from '../../common/util/common-service/common.service';
import { Router } from '@angular/router';
import { HeaderField } from '../../common/util/header-field';
import { HeaderValue } from '../../common/util/header-value';
import { AppConfig } from '../../../app.config';

@Injectable()
export class ParaSystemService extends CommonService {

  paraSystemApi = AppConfig.settings.baseUrl + "paraSystems";

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
    var promise = this.http.get(this.paraSystemApi + "?page=" + page, { headers: secureHeaders })
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
    var promise = this.http.get(this.paraSystemApi + "/" + id, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  create(paraSystem: any): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.post(this.paraSystemApi + "/create",
      JSON.stringify(paraSystem), { headers: secureHeaders })
      .toPromise()
      .then(response => response as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  update(paraSystem: any): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.put(this.paraSystemApi + "/update",
      paraSystem, { headers: secureHeaders })
      .toPromise()
      .then(response => response as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  delete(paraSystemId: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.delete(this.paraSystemApi + "/delete/"
      + paraSystemId, { headers: secureHeaders })
      .toPromise()
      .then(response => response as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  advanceFilterSearch(paraSystem: any, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.put(this.paraSystemApi + "/advance-filter?page=" + page,
      paraSystem, { headers: secureHeaders })
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
    var promise = this.http.delete(this.paraSystemApi + "/deleteAllBatch/" + entityIds, { headers: secureHeaders })
      .toPromise()
      .then(response => response as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  // hasParaSystemWithCode(paraSystemCode: string): Promise<any> {
  //   let accessToken = this.getAccessToken();
  //   var secureHeaders = new Headers();
  //   secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
  //   secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
  //   return this.http
  //     .get(this.paraSystemApi + "/hasCode/" + paraSystemCode, { headers: secureHeaders })
  //     .toPromise()
  //     .then(response => response.json() as any)
  //     .catch(error => {
  //       return this.handleError(error);
  //     });
  // }

  // getAllParaSystem(): Promise<any> {
  //   let accessToken = this.getAccessToken();
  //   var secureHeaders = new Headers();
  //   secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
  //   secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
  //   var promise = this.http.get(this.paraSystemApi + "/list", { headers: secureHeaders })
  //     .toPromise()
  //     .then(response => response.json() as any)
  //     .catch(error => {
  //       return this.handleError(error);
  //     });
  //   return promise;
  // }

}
