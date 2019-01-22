import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';
import { AppConfig } from '../../../../app.config';
import { CommonService } from '../../util/common-service/common.service';
import { AdmUser } from '../../../admin/adm-user/adm-user';
import { HeaderField } from '../../util/header-field';
import { HeaderValue } from '../../util/header-value';

/**
 * Examine the handling  of business requirements with AdmUser module
 */
@Injectable()
export class UserInfoService extends CommonService {

    /**  the user url */
    protected UserInfoApi = AppConfig.settings.baseUrl + "user-info";

    constructor(
        private http: Http,
        router: Router
    ) {
        super(router)
    }

    /**
     * @description create a new admUser
     * @param admUser the new admUser
     */
    updateInfo(userInfo: any): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.put(this.UserInfoApi,
            userInfo, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    changePassword(passInfo: any): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.put(this.UserInfoApi + "/change-pass",
            passInfo, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

}
