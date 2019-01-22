
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { CommonService } from '../../common/util/common-service/common.service';
import { Router } from '@angular/router';
import { HeaderField } from '../../common/util/header-field';
import { HeaderValue } from '../../common/util/header-value';
import { AppConfig } from '../../../app.config';
@Injectable()
export class BlockConditionService extends CommonService {

  blockApi = AppConfig.settings.baseUrl + 'blockConditions';
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
    const promise = this.http.get(this.blockApi + '?page=' + page, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  // getListBlockCondition(): Promise<any> {
  //   let accessToken = this.getAccessToken();
  //   var secureHeaders = new Headers();
  //   secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
  //   secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
  //   var promise = this.http.get(this.blockApi + '/list', { headers: secureHeaders })
  //     .toPromise()
  //     .then(response => response.json() as any)
  //     .catch(error => {
  //       return this.handleError(error);
  //     });
  //   return promise;
  // }

  findOne(amBlockId: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    const promise = this.http.get(
      this.blockApi + '/' + amBlockId, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  findByValue(value: string): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    const promise = this.http.get(
      this.blockApi + '/findByBlockValue/' + value, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  create(blockCondition): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    const promise = this.http.post(
      this.blockApi + '/create',
      JSON.stringify(blockCondition), { headers: secureHeaders })
      .toPromise()
      .then(response => response as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  update(blockCondition): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    const promise = this.http.put(this.blockApi + '/update',
      blockCondition, { headers: secureHeaders })
      .toPromise()
      .then(response => response as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  delete(amBlockId: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    const promise = this.http.delete(this.blockApi + '/delete/' + amBlockId, { headers: secureHeaders })
      .toPromise()
      .then(response => response as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  filterSearch(blockCondition, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    const promise = this.http.put(this.blockApi + '/advance-filter?page=' + page,
      blockCondition, { headers: secureHeaders })
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
    const promise = this.http.delete(this.blockApi + '/deleteAllBatch/' + entityIds, { headers: secureHeaders })
      .toPromise()
      .then(response => response as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

}



