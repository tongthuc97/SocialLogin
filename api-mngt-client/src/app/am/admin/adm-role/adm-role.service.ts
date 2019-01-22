import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';
import { CommonService } from '../../common/util/common-service/common.service';
import { AdmRole, AdmRoleReq } from './adm-role';
import { HeaderField } from '../../common/util/header-field';
import { HeaderValue } from '../../common/util/header-value';
import { AppConfig } from '../../../app.config';

/**
 * Examine the handling  of business requirements with AdmRole module
 */
@Injectable()
export class AdmRoleService extends CommonService {

    /**  the role url */
    AdmRoleApi = AppConfig.settings.apiUrl + "/savis/autho/api/v1/roles";

    constructor(
        private http: Http,
        router: Router
    ) {
        super(router)
    }

    /**
     * @description create a new admRole
     * @param admRole the new admRole
     */
    create(admRole: AdmRoleReq): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.post(this.AdmRoleApi,
            admRole, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description update a admRole
     * @param admRole the new admRole
     */
    update(admRole: AdmRoleReq): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.put(this.AdmRoleApi,
            admRole, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description Delete a list admRoles
     * @param entityIds the list ids
     */
    deleteAdmRole(id: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.delete(this.AdmRoleApi + "/" + id, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description Delete a list admRoles
     * @param entityIds the list ids
     */
    deleteAdmRolesById(entityIds: number[]): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.delete(this.AdmRoleApi + "?entityIds=" + entityIds, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
   * @description get page admRole
   * @param admRole the search restriction
   * @param page the paging restriction
   */
    getPageAdmRole(admRole: AdmRole, page: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.AdmRoleApi + "?search=" + encodeURI(JSON.stringify(admRole)) + "&page=" + page + "&size=" + 10, { headers: secureHeaders })
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
    getListAdmRole(): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.AdmRoleApi + "/list", { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description return a admRole by admRoleId
     * @param id the id of the admRole
     */
    findOne(id: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.AdmRoleApi + "/" + id, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json().data as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

}
