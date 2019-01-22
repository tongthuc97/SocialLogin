import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Application } from './application';

import 'rxjs/add/operator/toPromise';
import { CommonService } from '../../common/util/common-service/common.service';
import { Router } from '@angular/router';
import { HeaderField } from '../../common/util/header-field';
import { HeaderValue } from '../../common/util/header-value';
import { AppConfig } from '../../../app.config';

@Injectable()
export class ApplicationService extends CommonService {
    private apiUrl = AppConfig.settings.baseUrl + 'applications';

    constructor(
        private http: Http,
        router: Router
    ) {
        super(router)
    }

    /**
     * @description: Hàm trả về danh sách application
     * @param page: số trang muốn lấy
     */
    getAllApplication(page: number, size: number): Promise<any> {
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
     * @description: Hàm tìm kiếm application
     * @param application: thông tin tìm kiếm
     * @param page: số trang muốn lấy
     */
    filterSearch(subscriberId: number, policyId: number, application: Application, page: number, size: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.post(this.apiUrl + '/' + subscriberId + '/' + policyId + '/search?page=' + page + '&size=' + size, application, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
    /**
     * @description get list application
     */
    getListApplication() {
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
    /**
     * @description Hàm trả về danh sách application chưa được gán cho apiversion
     * @param apiVersionId: id của apiversion
     */
    getListForApiVersion(apiVersionId: number) {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.apiUrl + '/list/' + apiVersionId, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json())
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
    /**
     * @description: hàm trả về một application dựa vào id
     * @param applicationId: id của application
     */
    findOne(applicatonId: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.apiUrl + '/' + applicatonId, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json())
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
    /**
     * @description: hàm trả về một application theo tên tìm kiếm
     * @param name: tên ứng dụng
     */
    findByName(name: string): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.apiUrl + '/findByName/' + name, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json())
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
    /**
     * @description: hàm tạo mới một application
     * @param subscriberId
     * @param policyId 
     * @param newApplication 
     */
    createApplication(subscriberId: number, policyId: number, newApplication: Application): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.post(this.apiUrl + '/' + subscriberId + '/' + policyId + '/create', newApplication, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
    /**
     * @description: hàm tạo mới một application
     * @param subscriberId
     * @param policyId 
     * @param newApplication 
     */
    updateApplication(subscriberId: string, policyId: string, putApplication: Application): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.put(this.apiUrl + '/' + subscriberId + '/' + policyId + '/update', putApplication, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
    * @description: xóa một application
    * @param delApplicationrId: id của của appliction cẩn xóa
    */
    deleteApplication(delApplicationrId: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.delete(this.apiUrl + '/delete/' + delApplicationrId, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description: xóa một danh sách application
     * @param entityIds: danh sách id của các application cần xóa
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