import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ServiceResponseTimeInfo } from './service-response-time-info';
import { ServiceResponseTime } from './service-response-time';
import { ApiService } from '../../business/api/api.service';
import { ApiVersionService } from '../../business/api/api-detail/api-version/api-version.service';
import { Api } from '../../business/api/api';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Application } from '../../business/application/application';
import { ApplicationService } from '../../business/application/application.service';
import { LogdataService } from '../logdata/logdata.service';
import { LogdataForm } from '../logdata/logdata-form.component';
import { SearchObject } from '../common/search-object';
import { ApiVersion } from '../../business/api/api-detail/api-version/api-version';
import { Contants } from '../common/contants';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'service-response-time',
  templateUrl: './service-response-time.component.html',
  styleUrls: ['./service-response-time.component.css'],
  providers: [LogdataService, ApiService, ApiVersionService, ApplicationService]
})

/**
 * @description: Coordinator quản lý bảng 'ServiceResponseTime'
 */
export class ServiceResponseTimeComponent implements OnInit {
  // Biến bar chart 
  private barChartLabelsCurren: string[] = [];
  private barChartDataResponse: number[] = [];
  // config biểu đồ
  public barChartOptions1:any = {
    scaleShowVerticalLines: true,
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
    scales : {
      yAxes: [{
         ticks: {
            min: 0,
          },
          scaleLabel: {
            display: true,
            labelString: 'Millisecond'
          }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Time Request'
        }

      }]
    }
  };
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartLabels:string[] = [];
  public barChartData:any[] = [];
  
  // >Quản lý page trả về từ server
  serviceResponseTimeInfo: ServiceResponseTimeInfo;
  serviceResponseTimes: ServiceResponseTime[];
  totalPages: number = 0;
  currentPage = 0;
  pageLength: number;
  totalElements: number = 0;
  // >filter search.
  filterForm: FormGroup;
  filterObject: SearchObject = new SearchObject()
  // >checker. 
  currentPageView: number = 0;
  fromNumber: number = 0;
  toNumber: number = 0;
  // list data
  listApi: Api[];
  listApiVersion: ApiVersion[];
  apiSelections: Array<any> = [];
  apiVersionSelections: Array<any> = [];
  isData: boolean;

  constructor(
    private fb: FormBuilder,
    private logDataService: LogdataService,
    private apiService: ApiService,
    private apiVersionService: ApiVersionService,
    private authGuardSubmenu: AuthGuardSubmenu,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    // initialize forms.
    this.initializeFilterForm();
    // get list api
    this.getListApi();
    // search.
    this.search(this.filterObject, this.currentPage);
  }
  // Khởi tạo biểu đồ
  private barChartInit() {
    this.barChartLabels.length = 0;
    for (let i = this.barChartLabelsCurren.length - 1; i >= 0; i--) {
      this.barChartLabels.push(this.barChartLabelsCurren[i]);
    }
    this.barChartData = [
      {data: this.barChartDataResponse, label: 'Processing Time'},
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
    var size = this.serviceResponseTimes.length;
    this.fromNumber = this.currentPage * size + 1;
    this.toNumber = this.currentPageView * size + page;
    if (this.toNumber < 1) {
      this.fromNumber = 0;
      this.toNumber = 0;
    }
    this.pageLength = size;
    this.totalElements = this.serviceResponseTimeInfo.totalElements;
    this.totalPages = this.serviceResponseTimeInfo.totalPages;
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
      apiResponseTimeRequest.startDate = this.datePipe.transform(fromDate, "yyyy-MM-dd hh:mm");
    }

    let toDate = new Date(apiResponseTimeRequest.endDate);
    var timeArrT = apiResponseTimeRequest.endTime.split(':');
    if(!isNaN(toDate.getDate()) && timeArrT.length == 3) {
      toDate.setHours(timeArrT[0]);
      toDate.setMinutes(timeArrT[1])
      toDate.setSeconds(timeArrT[2])
      apiResponseTimeRequest.endDate = this.datePipe.transform(toDate, "yyyy-MM-dd hh:mm");
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
  search(apiResponseTimeRequest: any, page: number) {
    // transform date to time request format: yyyy-MM-dd HH:mm
    this.isData = false;

    if (Contants.isEmptyObject(apiResponseTimeRequest)) {
      this.convertStringtoDate(apiResponseTimeRequest);
    } else {
      apiResponseTimeRequest = new Object();
      this.convertFormtoObject(apiResponseTimeRequest);
      this.convertStringtoDate(apiResponseTimeRequest);
    }

    this.filterObject = apiResponseTimeRequest;
    this.barChartLabelsCurren = [];
    this.barChartDataResponse = [];
    
    this.logDataService.getApiResponseTime(apiResponseTimeRequest, page)
      .then(response => {
        this.isData = true;
        this.serviceResponseTimeInfo = response;
        this.serviceResponseTimes = this.serviceResponseTimeInfo.content;
        if(this.serviceResponseTimes.length <= 0) {
          this.isData = false;
        }
        console.log(this.serviceResponseTimes)
        this.serviceResponseTimes.forEach( serviceResponseTime => {
          
          this.barChartLabelsCurren.push(this.datePipe.transform(serviceResponseTime.timeRequest, 'dd/MM hh:mm:ss'));
          this.barChartDataResponse.push(new Date(serviceResponseTime.timeResponse).getTime() - new Date(serviceResponseTime.timeRequest).getTime());
        });
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
   * @description: check code is valid
   */
  isValidForm() {
    // check countyr code is valid
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
    if (this.filterForm.get('apiVersionId').invalid) {
      if (this.filterForm.get('apiVersionId').value == null) {
        return false;
      }
    }
    return true;
  }
  /**
  * @description: Hàm lấy danh sách Api
  */
  getListApi() {
    this.apiService.getListApi()
      .then(response => {
        this.listApi = response;
        this.listApi.sort((a, b) => {
          if (a.apiName < b.apiName) return -1;
          else if (a.apiName > b.apiName) return 1;
          else return 0;
        });
        this.initializeApiSelection();
      })
      .catch(error => console.log(error));
  }
  /**
  * @description: Hàm lấy danh sách Version
  */
  getListApiVersion(apiId: any) {
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

}
