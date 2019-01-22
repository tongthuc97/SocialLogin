import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Subscriber } from './subscriber';

import 'rxjs/add/operator/toPromise';
import { CommonService } from '../../common/util/common-service/common.service';
import { Router } from '@angular/router';
import { HeaderField } from '../../common/util/header-field';
import { HeaderValue } from '../../common/util/header-value';
import { AppConfig } from '../../../app.config';


@Injectable()
export class SubscriberService extends CommonService {
    private apiUrl = AppConfig.settings.baseUrl + 'subscribers';

    constructor(
        private http: Http,
        router: Router
    ) {
        super(router)
    }

    /**
     * @description: Hàm trả về danh sách subscriber
     * @param page: số trang muốn lấy
     */
    getAllSubscriber(page: number, size: number): Promise<any> {
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
   * @description: Hàm trả về danh sách subscriber
   */
    getListSubscriber(): Promise<any> {
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
   * @description: tìm kiếm subscriber
   * @param subscriber: thông tin tìm kiếm của subscriber
   * @param page: số trang trả về
   */
    search(subscriber: Subscriber, page: number, size: number) {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.post(this.apiUrl + '/search?page=' + page + '&size=' + size, subscriber, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
       * @description: hàm trả về một subscriber
       * @param id: id của subscriber
       */
    findOne(id: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.get(this.apiUrl + "/" + id, { headers: secureHeaders })
            .toPromise()
            .then(response => response.json() as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description: tạo mới thông tin một subscriber
     * @param newSubsciber: thông tin của subscriber
     */
    createSubscriber(newSubsciber: Subscriber): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.post(this.apiUrl + '/create',
            JSON.stringify(newSubsciber), { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
       * @description: cập nhật thông tin một subscriber
       * @param putSubsciber: thông tin của subscriber
       */
    updateSubscriber(putSubsciber: Subscriber): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.put(this.apiUrl + '/update',
            JSON.stringify(putSubsciber), { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
       * @description: xóa một subscriber
       * @param delSubscriberId: id của của subscriber cẩn xóa
       */
    deleteSubscriber(delSubscriberId: number): Promise<any> {
        let accessToken = this.getAccessToken();
        var secureHeaders = new Headers();
        secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
        secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
        var promise = this.http.delete(this.apiUrl + '/delete/' + delSubscriberId, { headers: secureHeaders })
            .toPromise()
            .then(response => response.status as any)
            .catch(error => {
                return this.handleError(error);
            });
        return promise;
    }

    /**
     * @description: xóa một danh sách subscriber
     * @param entityIds: danh sách id của các subscriber cần xóa
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