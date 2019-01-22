import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Location, DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { ApiService } from '../../business/api/api.service';
import { LogdataService } from '../logdata/logdata.service';
import { SearchObject } from '../common/search-object';
import { ApiUsageResponseInfo } from './api-usage-info';
import { ApiUsage } from './api-usage';
import { LogdataForm } from '../logdata/logdata-form.component';
import { ChartMax } from '../common/chart-max';
import { PopupDetailComponent } from '../common/popup-detail/popup-detail/popup-detail.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Contants } from '../common/contants';

@Component({
  selector: 'app-api-usage',
  templateUrl: './api-usage.component.html',
  styleUrls: ['./api-usage.component.css']
})
/**
 * @description: Coordinator quản lý bảng 'ApiUsage'
 */
export class ApiusageComponent implements OnInit {
  // Biến bar chart 
  private barChartLabelsCurren: string[] = [];
  private barChartDataSubscriptionsCurren: number[] = [];
  private barChartDataHitsCurren: number[] = [];
  // config biểu đồ
  public barChartOptions1: any = {
    scaleShowVerticalLines: false ,
    responsive: true,
    animation: {
        onComplete: function () {
            var chartInstance = this.chart,
            ctx = chartInstance.ctx;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                    var data = dataset.data[index];
                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
                });
            });
        }
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0
        },
        scaleLabel: {
          display: true,
          labelString: 'Request Count'
        }

      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Api Version'
        }

      }]
    }
  };
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartLabels: string[] = [];
  public barChartData: any[] = [];

  // filter form
  filterForm: FormGroup;
  filterObject: SearchObject;
  apiList: any;
  // api usage site
  apiUsageInfo: ApiUsageResponseInfo;
  apiUsages: ApiUsage[];
  checkAllItemFlag = false;
  // >Manage cinemaSession page information
  currentPageView: number;
  fromNumber: number;
  toNumber: number;
  // charts specifications
  pageLength: number;
  totalElements: number;
  totalPages: number;
  currentPage = 0;
  apiSelections: Array<any> = [];
  isData: boolean;
 
  constructor(
    private fb: FormBuilder,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private logdataService: LogdataService,
    private apiService: ApiService,
    private datePipe: DatePipe,
    private dialog: MdDialog
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // initialize forms.
    this.initializeFilterForm();
    // get list api
    this.getApiList();
    // search.
    this.search(this.filterObject, this.currentPage);
  }
  // Khởi tạo biểu đồ
  private barChartInit() {
    this.barChartLabels.length = 0;
    for (let i = 0; i < this.barChartLabelsCurren.length; i++) {
      this.barChartLabels.push(this.barChartLabelsCurren[i]);
    }
    this.barChartData = [
      { data: this.barChartDataSubscriptionsCurren, label: 'Subscriptions' },
      { data: this.barChartDataHitsCurren, label: 'Hits' }
    ];
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
    datetimeGroup.endTime = this.datePipe.transform(now, 'HH:mm:ss');
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
    var size = this.apiUsages.length;
    this.fromNumber = this.currentPage * size + 1;
    this.toNumber = this.currentPageView * size + page;
    if (this.toNumber < 1) {
      this.fromNumber = 0;
      this.toNumber = 0;
    }
    this.pageLength = size;
    this.totalElements = this.apiUsageInfo.totalElements;
    this.totalPages = this.apiUsageInfo.totalPages;
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
    apiUsageRequest.startDate = this.filterForm.get("startDate").value;
    apiUsageRequest.endDate = this.filterForm.get("endDate").value;
    apiUsageRequest.startTime = this.filterForm.get("startTime").value;
    apiUsageRequest.endTime = this.filterForm.get("endTime").value;
  }
  /**
  * @description: Hàm tìm kiếm.
  */
  search(apiUsageRequest: any, page: number) {
    // transform date to time request format: yyyy-MM-dd HH:mm
    if (apiUsageRequest != null) {
      this.convertStringtoDate(apiUsageRequest);
    } else {
      apiUsageRequest = new Object();
      this.convertFormtoObject(apiUsageRequest);
      this.convertStringtoDate(apiUsageRequest);
    }
    this.filterObject = apiUsageRequest;
    console.log(this.filterObject)

    this.barChartLabelsCurren = [];
    this.barChartDataSubscriptionsCurren = [];
    this.barChartDataHitsCurren = [];

    this.logdataService.getApiUsage(apiUsageRequest, page)
      .then(response => {
        this.isData = true;
        this.apiUsageInfo = response;
        this.apiUsages = this.apiUsageInfo.content;
        if(this.apiUsages.length <= 0) {
          this.isData = false;
        }

        this.apiUsages.forEach(apiUsage => {
          let name: string = apiUsage.apiName.trim();
          let max = ChartMax.getMax(this.apiUsages.length);
          if (apiUsage.apiName.trim().length > max) {
            name = apiUsage.apiName.trim().substring(0, max);
            name = name + " ...";
          }
          name = name + " -v" + apiUsage.apiVersion;
          this.barChartLabelsCurren.push(name);
          this.barChartDataSubscriptionsCurren.push(apiUsage.appCount);
          this.barChartDataHitsCurren.push(apiUsage.requestCount);
        });
        // 
        this.barChartInit();
        this.setCurrentPage(page);
      })
      .catch(error => {
        this.isData = false;
        console.log(error)
      });
    this.barChartInit();
  }
  /**
   * @description: Hàm lấy danh sách Api
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
   * @description: Hàm khởi tạo ứng dụng 
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
   * show detail logdata
   */
  showDetail(apiVersionId: number) {
    // the filter object
    let filterObject: SearchObject = new SearchObject();
    if(this.filterObject != null) {
      filterObject = this.filterObject;
    }
    filterObject.apiVersionId = apiVersionId;
    // the dialog
    let dialogRef: MdDialogRef<PopupDetailComponent>;
    const dialogConfig = new MdDialogConfig();
    // open dialog
    dialogRef = this.dialog.open(PopupDetailComponent,dialogConfig);
    dialogRef.componentInstance.filterObject = filterObject;

  }
  
}


