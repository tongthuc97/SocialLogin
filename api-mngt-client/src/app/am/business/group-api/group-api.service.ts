import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { GroupApi } from './group-api';

import 'rxjs/add/operator/toPromise';
import { CommonService } from '../../common/util/common-service/common.service';
import { Router } from '@angular/router';
import { HeaderField } from '../../common/util/header-field';
import { HeaderValue } from '../../common/util/header-value';
import { AppConfig } from '../../../app.config';

@Injectable()
export class GroupApiService extends CommonService {
    private apiUrl = AppConfig.settings.baseUrl + 'groupapi';

    constructor(
        private http: Http,
        router: Router
    ) {
        super(router)
    }

    /**
     * @description: Hàm trả về danh sách apiType
     * @param page: số trang muốn lấy
     */
    getAllGroupApi(page: number, size: number): Promise<any> {
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
     * @description get list application
     */
    getListGroupApi() {
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
     * @description: hàm trả về một apiType dựa vào id
     * @param apiTypeId: id của apiType
     */
    findOne(apiTypeId: number): Promise<any> {
        debugger
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.apiUrl + '/' + apiTypeId, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json()  as any)
            .catch(error => {
                return this.handleError(error);
            });
            console.log(promise)
        return promise;
    }
    /**
     * @description: hàm tạo mới một apiType
     * @param newGroupApi 
     */
    createGroupApi(newGroupApi: GroupApi): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.post(this.apiUrl , newGroupApi, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }
    /**
     * @description: hàm tạo mới một apiType
     * @param putGroupApi 
     */
    updateGroupApi( putGroupApi: GroupApi): Promise<any> {
        debugger
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.put(this.apiUrl , putGroupApi, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
    * @description: xóa một application
    * @param delGroupApiId: id của của appliction cẩn xóa
    */
    deleteGroupApi(delGroupApiId: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.delete(this.apiUrl + '/' + delGroupApiId, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description: xóa một danh sách apiType
     * @param entityIds: danh sách id của các apiType cần xóa
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

    filterSearchGroupApi(filter: string, page: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.apiUrl + '?filter=' + filter + '&page=' + page, { headers: secureHeaders })
          .toPromise()
          .then(response => response.json().data as any)
          .catch(error => {
            return this.handleError(error);
          });
        return promise;
      }
    
      advanceSearchType(searchObject: GroupApi, page: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.apiUrl + '?search=' + encodeURI(JSON.stringify(searchObject)) + '&page=' + page, { headers: secureHeaders })
          .toPromise()
          .then(response => response.json().data as any)
          .catch(error => {
            return this.handleError(error);
          });
        return promise;
      }
    

}