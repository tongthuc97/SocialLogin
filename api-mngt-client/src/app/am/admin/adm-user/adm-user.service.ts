import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';
import { CommonService } from '../../common/util/common-service/common.service';
import { AdmUser } from './adm-user';
import { HeaderField } from '../../common/util/header-field';
import { HeaderValue } from '../../common/util/header-value';
import { AppConfig } from '../../../app.config';

/**
 * Examine the handling  of business requirements with AdmUser module
 */
@Injectable()
export class AdmUserService extends CommonService {

    /**  the user url */
    AdmUserApi = AppConfig.settings.apiUrl + "/savis/autho/api/v1/users";

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
    create(admUser: AdmUser): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.post(this.AdmUserApi,
            admUser, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description update a admUser
     * @param admUser the new admUser
     */
    update(admUser: AdmUser): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.put(this.AdmUserApi,
            admUser, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description Delete a list admUsers
     * @param entityIds the list ids
     */
    deleteAdmUser(id: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.delete(this.AdmUserApi + "/" + id, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description Delete a list admUsers
     * @param entityIds the list ids
     */
    deleteAdmUsersById(entityIds: number[]): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.delete(this.AdmUserApi + "?entityIds=" + entityIds, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
   * @description get page admUser
   * @param admUser the search restriction
   * @param page the paging restriction
   */
    getPageAdmUser(admUser: AdmUser, page: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.AdmUserApi + "?search=" + encodeURI(JSON.stringify(admUser)) + "&page=" + page + "&size=" + 10, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description Returns a list of entities
     */
    getListAdmUser(): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.AdmUserApi + "/list", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description return a admUser by admUserId
     * @param id the id of the admUser
     */
    findOne(id: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.AdmUserApi + "/" + id, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json().data as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

}
