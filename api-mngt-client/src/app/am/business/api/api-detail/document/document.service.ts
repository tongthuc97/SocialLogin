import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Document } from './Document';
import { Router } from '@angular/router';
import { CommonService } from '../../../../common/util/common-service/common.service';
import { HeaderField } from '../../../../common/util/header-field';
import { HeaderValue } from '../../../../common/util/header-value';
import { AppConfig } from '../../../../../app.config';

/**
 * Examine the handling  of business requirements with document module
 */
@Injectable()
export class DocumentService extends CommonService {

  /**  the api url */
  documentApi = AppConfig.settings.baseUrl + "apidocuments";

  constructor(
    private http: Http,
    router: Router
  ) {
    super(router)
  }

  /**
   * @description hàm trả về danh sách document
   * @param page thông tin số trang
   */
  getDocuments(apiVersionId: number, filterSearch: string, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.documentApi + "?apiVersionId=" + apiVersionId + "&filterSearch=" + filterSearch + "&page=" + page, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
   * @description hàm trả về thông tin 1 document
   * @param id id của document
   */
  findOne(id: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.get(this.documentApi + "/" + id, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
   * @description hàm thực hiện tìm kiếm document và trả về danh sách các document
   * @param document thông tin tìm kiếm 
   * @param page thông tin về số trang
   */
  advanceSearch(document: Document, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.post(this.documentApi + "/advance-search?page=" + page,
      document, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
   * @description hàm thực hiện tìm kiếm document và trả về danh sách các document
   * @param document thông tin tìm kiếm 
   * @param page thông tin về số trang
   */
  filterSearch(filterSearch: string, page: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.post(this.documentApi + "/filter-search/" + filterSearch + "?page=" + page, { headers: secureHeaders })
      .toPromise()
      .then(response => response.json() as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }


  /**
   * @description hàm tạo mới 1 document
   * @param document thông tin document cần tạo mới
   */
  create(document: Document): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.post(this.documentApi + "",
      document, { headers: secureHeaders })
      .toPromise()
      .then(response => response.status as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
   * @description hàm cập nhật thông tin document
   * @param document thông tin mới của document cần cập nhật
   */
  update(document: Document): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    secureHeaders.append(HeaderField.CONTENT_TYPE, HeaderValue.APPLICATION_JSON_VALUE);
    var promise = this.http.put(this.documentApi + "",
      document, { headers: secureHeaders })
      .toPromise()
      .then(response => response.status as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
   * @description hàm xóa document
   * @param documentId id của document cần xóa
   */
  delete(documentId: number): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    var promise = this.http.delete(this.documentApi + "/"
      + documentId, { headers: secureHeaders })
      .toPromise()
      .then(response => response.status as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  /**
   * @description hàm thực hiện xóa một dánh sách các document
   * @param entityIds danh sách id các document cần xóa
   */
  deleteAllBatch(entityIds: number[]): Promise<any> {
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    var promise = this.http.delete(this.documentApi + "/deleteAllBatch/" + entityIds, { headers: secureHeaders })
      .toPromise()
      .then(response => response.status as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

  uploadFile(file: File): Promise<any> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    let accessToken = this.getAccessToken();
    var secureHeaders = new Headers();
    secureHeaders.append("reportProgress","true");
    secureHeaders.append(HeaderField.AUTHORIZATION, accessToken);
    var promise = this.http.post(this.documentApi + "/upload"  ,formdata, { headers: secureHeaders })
      .toPromise()
      .then(response => response.status as any)
      .catch(error => {
        return this.handleError(error);
      });
    return promise;
  }

}
