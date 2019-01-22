import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Location, DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../business/api/api.service';
import { LogdataService } from '../logdata/logdata.service';
import { SearchObject } from '../common/search-object';
import { LogdataForm } from '../logdata/logdata-form.component';
import { ApiLastAccessTimeInfo } from './api-last-access-time-info';
import { ApiLastAccessTime } from './api-last-access-time';
import { element } from 'protractor';
import { ApiVersionService } from '../../business/api/api-detail/api-version/api-version.service';
import { ApiVersion } from '../../business/api/api-detail/api-version/api-version';
import { Api } from '../../business/api/Api';
import { ChartMax } from '../common/chart-max';

@Component({
  selector: 'app-api-last-access-time',
  templateUrl: './api-last-access-time.component.html',
  styleUrls: ['./api-last-access-time.component.css']
})
/**
 * @description: Coordinator quản lý bảng 'ApiLastAccessTime'
 */
export class ApiLastAccessTimeComponent implements OnInit {

  // filter form
  filterForm: FormGroup;
  filterObject: SearchObject = new SearchObject()
  // api usage site
  apiLastAccessTimeInfo: ApiLastAccessTimeInfo;
  apiLastAccessTimes: ApiLastAccessTime[];
  checkAllItemFlag = false;
  // >Manage cinemaSession page information
  currentPageView: number;
  fromNumber: number;
  toNumber: number;
  apiList: Api[];
  listApiVersion: ApiVersion[];
  currentPage = 0;
  // charts specifications
  pageLength: number;
  totalElements: number = 0;
  totalPages: number = 0;
  apiSelections: Array<any> = [];
  apiVersionSelections: Array<any> = [];
  isData: boolean = false;

  constructor(
    private fb: FormBuilder,
    private logDataService: LogdataService,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private apiService: ApiService,
    private apiVersionService: ApiVersionService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  
  ngOnInit() {
    // initialize filter form
    this.initializeFilterForm();
    // get list api
    this.getApiList();
    // search.
    this.search(this.filterObject, this.currentPage);
  }
  /**
  * @description: Hàm khởi tạo form
  */
  initializeFilterForm() {
    this.filterForm = LogdataForm.getSearchForm(this.fb);
  }

  /**
   * @description: Setting attribute để hiển thị phân trang.
   */
  private setCurrentPage(page) {
    if (page > 0) {
      this.currentPage = page;
    } else {
      this.currentPage = 0;
    }
    this.currentPageView = this.currentPage + 1;
    var size = this.apiLastAccessTimes.length;
    this.fromNumber = this.currentPage * size + 1;
    this.toNumber = this.currentPageView * size + page;
    if (this.toNumber < 1) {
      this.fromNumber = 0;
      this.toNumber = 0;
    }
    this.pageLength = size;
    this.totalElements = this.apiLastAccessTimeInfo.totalElements;
    this.totalPages = this.apiLastAccessTimeInfo.totalPages;
    this.currentPage = page;
  }
  /**
  * @description: Coordinator quản lý việc chuyển trang
  * @param page: số trang
  */
 choosePageNumber(page) {
    var flag = true;
    var pageNumber;
    if(page.valueAsNumber != null) {
        // La chu hay so thap phan
        if(isNaN(page.valueAsNumber) || !Number.isInteger(page.valueAsNumber)) {
            flag = false;
            page.value = this.currentPage + 1;
            this.currentPageView = this.currentPage + 1;
        } else {
            pageNumber = page.valueAsNumber - 1;
        }
    } else {
        pageNumber = page;
    }

    if (flag == true && this.currentPage > pageNumber && pageNumber < 0) {
        pageNumber = 0;
        page.value = pageNumber + 1;
    }
    if (flag == true && this.currentPage < pageNumber && pageNumber > this.totalPages-1) {
      pageNumber = this.totalPages-1;
      page.value = pageNumber + 1;

    }
    if (flag == true) {
        this.currentPage = pageNumber;
        this.currentPageView = this.currentPage + 1;
        this.search(this.filterObject, this.currentPage);
    }
  }
  /**
  * @description: Hàm tìm kiếm.
  */
  search(apiLastAccessRequest: any, page: number) {
      // transform date to time request format: yyyy-MM-dd HH:mm
    this.filterObject = apiLastAccessRequest;

    this.logDataService.getApiLastAccessTime(apiLastAccessRequest, page)
      .then(response => {
        this.isData = true;
        this.apiLastAccessTimeInfo = response;
        this.apiLastAccessTimes = this.apiLastAccessTimeInfo.content;
        console.log(this.apiLastAccessTimes)
        if(this.apiLastAccessTimes.length <= 0) {
          this.isData = false;
        }

        this.setCurrentPage(page);
      
      })
      .catch(error => {
        this.isData = false;
        console.log(error)
      });
  }
  /**
   * @description: Hàm lấy danh sách api
   */
  getApiList() {
    this.apiService.getListApi()
      .then(response => {
        this.apiList = response;
        this.apiList.sort((a, b) => {
          if (a.apiName < b.apiName) return -1;
          else if (a.apiName > b.apiName) return 1;
          else return 0;
        });
        this.initializeApiSelection();
      })
      .catch(error => console.log(error));
  }
  /**
   * @description: Hàm lấy danh sách version
   */
  getListApiVersion(apiId: number) {
    this.apiVersionService.getListApiVersionByApiId(apiId)
      .then(response => {
        this.listApiVersion = response;
        this.listApiVersion.sort((a, b) => {
          if (a.apiVersion < b.apiVersion) return -1;
          else if (a.apiVersion > b.apiVersion) return 1;
          else return 0;
        });
        this.initializeApiVersionSelection();
      })
      .catch(error => console.log(error));
  }
  /**
   * @description: Hàm khởi tạo api
   */
  initializeApiSelection() {
    let api_datas = [];
    this.apiList.forEach(element => {
      var item = {
        id: null, text: null
      };
      item.text = element.apiName;
      item.id = element.apiId;
      api_datas.push(item);
    });
    this.apiSelections = api_datas;
  }
  /**
  * @description: Khi ấn vào nút clear trong ng-select của Api
  */
  removeApiSelection() {
    
    this.listApiVersion = [];
    this.initializeApiVersionSelection();
    this.filterForm.get('apiVersionId').setValue(null)
  }
  /**
   * @description: Hàm khởi tạo version
   */
  initializeApiVersionSelection() {
    let apiVersion_datas = [];
    this.listApiVersion.forEach(element => {
      var item = {
        id: null, text: null
      };
      item.text = element.apiVersion;
      item.id = element.apiVersionId;
      apiVersion_datas.push(item);
    });
    this.apiVersionSelections = apiVersion_datas;
  }

  /**
   * @description: check code is valid
   */
  isValidForm() {
    // check countyr code is valid
    if (this.filterForm.get('apiId').invalid) {
      if (this.filterForm.get('apiId').value == null || this.filterForm.get('apiId').value == '') {
        return false;
      }
    }
    return true;
  }
}

