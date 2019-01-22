import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { ApplicationToken } from './application-token';

import 'rxjs/add/operator/toPromise';
import { CommonService } from '../../common/util/common-service/common.service';
import { Router } from '@angular/router';
import { HeaderField } from '../../common/util/header-field';
import { HeaderValue } from '../../common/util/header-value';
import { AppConfig } from '../../../app.config';

@Injectable()
export class ApplicationTokenService extends CommonService {
    private apiUrl = AppConfig.settings.baseUrl + 'applicationTokens';
    constructor(
        private http: Http,
        router: Router
    ) {
        super(router)
    }

    /**
     * @description: Hàm trả về danh sách applicationToken
     * @param page: số trang muốn lấy
     */
    getAllApplicationToken(page: number, size: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.apiUrl + '?page=' + page + '&size=' + size, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json())
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
    /**
     * @description: Hàm tìm kiếm applicationToken
     * @param applicationToken: thông tin tìm kiếm
     * @param page: số trang muốn lấy
     */
    filterSearch(applicationId: number, applicationToken: ApplicationToken, page: number, size: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.post(this.apiUrl + '/' + applicationId + '/search?page=' + page + '&size=' + size, applicationToken, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
    /**
     * @description: hàm trả về một applicationToken dựa vào id
     * @param applicationTokenId: id của applicationToken
     */
    // findOne(applicationTokenId: string): Promise<any> {
    //     let accessToken = this.getAccessToken();
    //     var secureHeaders = new Headers();
    //     secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    //     secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    //     var promise = this.http.get(this.apiUrl + '/' + applicationTokenId, { headers: secureHeaders })
    //         .toPromise()
    //         .then(response => response.json() as any)
    //         .catch(error => {
    //             return this.handleError(error);
    //         });
    //     return promise;
    // }
    /**
     * @description: hàm tạo mới một applicationToken
     * @param applicationId 
     * @param newApplicationToken 
     */
    createApplicationToken(applicationId: number, newApplicationToken: ApplicationToken): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.post(this.apiUrl + '/' + applicationId + '/create', newApplicationToken, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
    /**
     * @description: hàm tạo mới một applicationToken
     * @param applicationId
     * @param newApplicationToken 
     */
    updateApplicationToken(applicationId: number, newApplicationToken: ApplicationToken): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.put(this.apiUrl + '/' + applicationId + '/update', newApplicationToken, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
    * @description: xóa một applicationToken
    * @param delApplicationTokenId: id của của appliction cẩn xóa
    */
    deleteApplicationToken(delApplicationTokenrId: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.delete(this.apiUrl + '/delete/' + delApplicationTokenrId, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description: xóa một danh sách applicationToken
     * @param entityIds: danh sách id của các applicationToken cần xóa
     */
    deleteAllBatch(entityIds: number[]): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.delete(this.apiUrl + "/deleteAllBatch/" + entityIds, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

}