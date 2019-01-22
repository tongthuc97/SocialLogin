
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DataTable } from 'angular2-datatable';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { ServiceMethodUsage } from './service-method-usage';
import { ServiceMethodUsagePageInfo } from './service-method-usage-info';
import { ApiService } from '../../business/api/api.service';
import { Api } from '../../business/api/Api';
import { LogdataService } from '../logdata/logdata.service';
import { LogdataForm } from '../logdata/logdata-form.component';
import { SearchObject } from '../common/search-object';
import { MdDialogRef, MdDialogConfig, MdDialog } from '@angular/material';
import { PopupDetailComponent } from '../common/popup-detail/popup-detail/popup-detail.component';
import { DatePipe } from '@angular/common';
import { Contants } from '../common/contants';

@Component({
  selector: 'service-method-usage',
  templateUrl: './service-method-usage.component.html',
  styleUrls: ['./service-method-usage.component.css'],
  providers: [LogdataService, DataTable, ApiService]
})

/**
 * @description: Coordinator quản lý bảng 'ServiceMethodUsage'
 */
export class ServiceMethodUsageComponent implements OnInit {
  // >Quản lý page trả về từ server
  serviceMethodUsageInfo: ServiceMethodUsagePageInfo;
  serviceMethodUsages: ServiceMethodUsage[];
  totalPages: number;
  currentPage = 0;
  pageLength: number;
  totalElements: number;
  // >filter search.
  filterForm: FormGroup;
  filterObject: SearchObject = new SearchObject()
  // >checker.
  currentPageView: number;
  fromNumber: number;
  toNumber: number;
  listApi: Api[];
  apiSelections: Array<any> = [];
  isData: boolean;
  // danh sách result
  listResult = [
    { id: 'GET', text: 'Get' },
    { id: 'POST', text: 'Post' },
    { id: 'PUT', text: 'Put' },
    { id: 'DELETE', text: 'Delete' }
  ];

  constructor(
    private logDataService: LogdataService,
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private authGuardSubmenu: AuthGuardSubmenu,
    private dialog: MdDialog
  ) { }

  ngOnInit() {
    // initialize forms.
    this.initializeFilterForm();
    // get list api
    this.getListApi();
    // get datas.
    this.search(this.filterObject, this.currentPage);
  }
  /**
  * @description: Hàm khởi tạo form
  */
  initializeFilterForm() {
    this.filterForm = LogdataForm.getSearchForm(this.fb);
    
    let datetimeGroup: any = new Object();
    let now = new Date();
    let lastWeek = new Date(now.setDate(now.getDate() - Contants.DATE_FROM_TO));
    now = new Date();

    datetimeGroup.endDate = this.datePipe.transform(now, 'yyyy-MM-dd');
    datetimeGroup.endTime = this.datePipe.transform(now, 'hh:mm:ss');
    datetimeGroup.startDate = this.datePipe.transform(lastWeek, 'yyyy-MM-dd');
    datetimeGroup.startTime = '00:00:00';
    LogdataForm.binddingData(this.filterForm, datetimeGroup);
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
    var size = this.serviceMethodUsages.length;
    this.fromNumber = this.currentPage * size + 1;
    this.toNumber = this.currentPageView * size + page;
    if (this.toNumber < 1) {
      this.fromNumber = 0;
      this.toNumber = 0;
    }
    this.pageLength = size;
    this.totalElements = this.serviceMethodUsageInfo.totalElements;
    this.totalPages = this.serviceMethodUsageInfo.totalPages;
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
  * @description: hàm chuyển chuỗi thành định dạng ngày/tháng/năm.
  */
  convertStringtoDate(apiResponseTimeRequest: any) {
    let fromDate = new Date(apiResponseTimeRequest.startDate);
    var timeArr = apiResponseTimeRequest.startTime.split(':');
    if(!isNaN(fromDate.getDate()) && timeArr.length == 3) {
      fromDate.setHours(timeArr[0])
      fromDate.setMinutes(timeArr[1])
      fromDate.setSeconds(timeArr[2])
      apiResponseTimeRequest.startDate = this.datePipe.transform(fromDate, "yyyy-MM-dd HH:mm:ss");
    }

    let toDate = new Date(apiResponseTimeRequest.endDate);
    var timeArrT = apiResponseTimeRequest.endTime.split(':');
    if(!isNaN(toDate.getDate()) && timeArrT.length == 3) {
      toDate.setHours(timeArrT[0]);
      toDate.setMinutes(timeArrT[1])
      toDate.setSeconds(timeArrT[2])
      apiResponseTimeRequest.endDate = this.datePipe.transform(toDate, "yyyy-MM-dd HH:mm:ss");
    }
  }
  /**
  * @description: hàm chuyển dữ liệu từ filterForm sang Object
  */
  convertFormtoObject(apiUsageRequest: any) {
    apiUsageRequest.apiId = this.filterForm.get("apiId").value;
    apiUsageRequest.method = this.filterForm.get("method").value;
    apiUsageRequest.startDate = this.filterForm.get("startDate").value;
    apiUsageRequest.endDate = this.filterForm.get("endDate").value;
    apiUsageRequest.startTime = this.filterForm.get("startTime").value;
    apiUsageRequest.endTime = this.filterForm.get("endTime").value;
  }
  /**
  * @description: Hàm tìm kiếm.
  */
  search(serviceMethodUsageRequest: any, page: number) {
    this.isData = false;
    // transform date to time request format: yyyy-MM-dd HH:mm
    if (Contants.isEmptyObject(serviceMethodUsageRequest)) {
      this.convertStringtoDate(serviceMethodUsageRequest);
    } else {
      serviceMethodUsageRequest = new Object();
      this.convertFormtoObject(serviceMethodUsageRequest);
      this.convertStringtoDate(serviceMethodUsageRequest);
    }

    this.filterObject = serviceMethodUsageRequest;
  
    this.logDataService.getApiMethodUsage(serviceMethodUsageRequest, page)
      .then(response => {
        console.log(response);
        this.isData = true;
        this.serviceMethodUsageInfo = response;
        this.serviceMethodUsages = this.serviceMethodUsageInfo.content;
        if(this.serviceMethodUsages.length <= 0) {
          this.isData = false;
        }

        this.setCurrentPage(page);
      })
      .catch(error => {
        this.isData = false;
        console.log(error);
      });
  }
  /**
   * @description: check code is valid
   */
  isValidForm() {
    if (this.filterForm.get('startDate').invalid) {
      if (this.filterForm.get('startDate').errors.required) {
        return false;
      }
    }
    if (this.filterForm.get('startTime').invalid) {
      if (this.filterForm.get('startTime').errors.required) {
        return false;
      }
    }
    if (this.filterForm.get('endDate').invalid) {
      if (this.filterForm.get('endDate').errors.required) {
        return false;
      }
    }
    if (this.filterForm.get('endTime').invalid) {
      if (this.filterForm.get('endTime').errors.required) {
        return false;
      }
    }
    if (this.filterForm.get('apiId').invalid) {
      if (this.filterForm.get('apiId').value == null) {
        return false;
      }
    }
    return true;
  }
  /**
  * @description: Hàm lấy danh sách Api
  */
  getListApi() {
    this.apiService.getListApi().then(
      listApi => {
        this.listApi = listApi;
        this.listApi.sort((a, b) => {
          if (a.apiName < b.apiName) return -1;
          else if (a.apiName > b.apiName) return 1;
          else return 0;
        });
        this.initializeApiSelection();
      }).catch(
        error => {
          console.log(error);
        }
      );
  }
  /**
  * @description: Hàm khởi tạo ứng dụng 
  */
  initializeApiSelection() {
    let api_datas = [];
    this.listApi.forEach(element => {
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
   * show detail logdata
   */
  showDetail(apiVersionId: number, httpMethod: string) {
    // the filter object
    let filterObject: SearchObject = new SearchObject();
    if(this.filterObject != null) {
      filterObject = this.filterObject;
    }

    filterObject.apiId = null;
    filterObject.apiVersionId = apiVersionId;
    filterObject.method = httpMethod;
    // the dialog
    let dialogRef: MdDialogRef<PopupDetailComponent>;
    const dialogConfig = new MdDialogConfig();
    // open dialog
    dialogRef = this.dialog.open(PopupDetailComponent,dialogConfig);
    dialogRef.componentInstance.filterObject = filterObject;
  }
}
