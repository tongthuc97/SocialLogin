import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';
import { CommonService } from '../../common/util/common-service/common.service';
import { AdmRight } from './adm-right';
import { HeaderField } from '../../common/util/header-field';
import { HeaderValue } from '../../common/util/header-value';
import { AppConfig } from '../../../app.config';

/**
 * Examine the handling  of business requirements with AdmRight module
 */
@Injectable()
export class AdmRightService extends CommonService {

    /**  the right url */
    AdmRightApi = AppConfig.settings.apiUrl + "/savis/autho/api/v1/rights";

    constructor(
        private http: Http,
        router: Router
    ) {
        super(router)
    }

    /**
     * 
     * @description create a new admRight
     * @param admRight the new admRight
     */
    create(admRight: AdmRight): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.post(this.AdmRightApi,
            admRight, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description update a admRight
     * @param admRight the new admRight
     */
    update(admRight: AdmRight): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.put(this.AdmRightApi,
            admRight, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description Delete a list admRights
     * @param entityIds the list ids
     */
    deleteAdmRight(id: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.delete(this.AdmRightApi + "/" + id, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description Delete a list admRights
     * @param entityIds the list ids
     */
    deleteAdmRightsById(entityIds: number[]): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.delete(this.AdmRightApi + "?entityIds=" + entityIds, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
   * @description get page admRight
   * @param admRight the search restriction
   * @param page the paging restriction
   */
    getPageAdmRight(admRight: AdmRight, page: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.AdmRightApi + "?search=" + encodeURI(JSON.stringify(admRight)) + "&page=" + page + "&size=" + 10, { headers: secureHeaders })
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
    getListAdmRight(): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.AdmRightApi + "/list", { headers: secureHeaders })
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
    getListAdmRightParent(): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.AdmRightApi + "/list-parent", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description return a admRight by admRightId
     * @param id the id of the admRight
     */
    findOne(id: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);

        var promise = this.http.get(this.AdmRightApi + "/" + id, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json().data as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description return a admRight by admRightId
     * @param id the id of the admRight
     */
    getListAccess(id: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.AdmRightApi + "/" + id + "/right-access", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json().data as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description return a admRight by admRightId
     * @param id the id of the admRight
     */
    getListApi(id: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.AdmRightApi + "/" + id + "/right-api", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json().data as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

}
