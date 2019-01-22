import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';
import { CommonService } from '../../common/util/common-service/common.service';
import { AdmAccess } from './adm-access';
import { HeaderField } from '../../common/util/header-field';
import { HeaderValue } from '../../common/util/header-value';
import { AppConfig } from '../../../app.config';

/**
 * Examine the handling  of business requirements with AdmAccess module
 */
@Injectable()
export class AdmAccessService extends CommonService {

    /**  the access url */
    AdmAccessApi = AppConfig.settings.apiUrl + "/savis/autho/api/v1/access-list";

    constructor(
        private http: Http,
        router: Router
    ) {
        super(router)
    }

    /**
     * @description create a new admAccess
     * @param admAccess the new admAccess
     */
    create(admAccess: AdmAccess): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.post(this.AdmAccessApi,
            admAccess, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description update a admAccess
     * @param admAccess the new admAccess
     */
    update(admAccess: AdmAccess): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.put(this.AdmAccessApi,
            admAccess, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description Delete a list admAccesss
     * @param entityIds the list ids
     */
    deleteAdmAccess(id: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.delete(this.AdmAccessApi + "/" + id, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description Delete a list admAccesss
     * @param entityIds the list ids
     */
    deleteAdmAccesssById(entityIds: number[]): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.delete(this.AdmAccessApi + "?entityIds=" + entityIds, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
   * @description get page admAccess
   * @param admAccess the search restriction
   * @param page the paging restriction
   */
    getPageAdmAccess(admAccess: AdmAccess, page: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.AdmAccessApi + "?search=" + encodeURI(JSON.stringify(admAccess)) + "&page=" + page + "&size=" + 10, { headers: secureHeaders })
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
    getListAdmAccess(): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.AdmAccessApi + "/list", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description return a admAccess by admAccessId
     * @param id the id of the admAccess
     */
    findOne(id: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.AdmAccessApi + "/" + id, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json().data as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

}
