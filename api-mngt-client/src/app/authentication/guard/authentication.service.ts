import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { Constants } from '../../am/common/util/constants';
import { CommonService } from '../../am/common/util/common-service/common.service';
import { Router } from '@angular/router';
import { HeaderField } from '../../am/common/util/header-field';
import { HeaderValue } from '../../am/common/util/header-value';
import { AppConfig } from '../../app.config';

@Injectable()
export class AuthenticationService extends CommonService {
  userApi = AppConfig.settings.baseUrl + "auth";
  constructor(
    private http: Http,
    router: Router
  ) {
    super(router)
  }

  logout(): Promise<any> {
    // remove user from local storage to log user out
    var secureHeaders = new Headers();
    secureHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    var promise = this.http.post(this.userApi + "/logout", { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  login(username: string, password: string): Promise<any> {
    let loginInfo: any = {};
    loginInfo.username = username;
    loginInfo.password = password;
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.post(this.userApi + "/login", loginInfo, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  getUserInfo(authorizationCode: string) {
    var promise = this.http.post(this.userApi + "/user-info", authorizationCode)
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  getAccessTokenByRefreshToken() {
    let refreshToken = localStorage.getItem(Constants.REFRESH_TOKEN);
    var promise = this.http.post(this.userApi + "/access-token", refreshToken)
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

}

