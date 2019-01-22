import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';


import 'rxjs/add/operator/toPromise';
import { CommonService } from '../../common/util/common-service/common.service';
import { Router } from '@angular/router';
import { HeaderField } from '../../common/util/header-field';
import { HeaderValue } from '../../common/util/header-value';
import { AppConfig } from '../../../app.config';

@Injectable()
export class LogDataCodeService extends CommonService {
    private apiUrl = AppConfig.settings.baseUrl + 'logdatacodes';

    constructor(
        private http: Http,
        router: Router
    ) {
        super(router)
    }


    /**
     * @description get list log data code
     */
    getListLogDataCode() {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.apiUrl + '/list', { headers: secureHeaders })
            .toPromise()
            .then(response => response.json())
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
}