import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LogdataForm } from '../logdata/logdata-form.component';
import { messageServicePortal } from './message-service-portal';
import { MessageServicePortalInfo } from './message-service-portal-info';
import { LogdataService } from '../logdata/logdata.service';
import { DialogService } from '../../common/dialog/dialog.service';
import { ResponseMessage2 } from '../../common/util/response-message-2/response-message-2';
import { ApiService } from '../../business/api/api.service';
import { ApiVersionService } from '../../business/api/api-detail/api-version/api-version.service';
import { ApplicationService } from '../../business/application/application.service';
import { LogDataCodeService } from '../../business/logdatacode/logdatacode.service';
import { Application } from '../../business/application/application';
import { LogDataCode } from '../../business/logdatacode/logdatacode';
import { ApiVersion } from '../../business/api/api-detail/api-version/api-version';
import { DatePipe } from '@angular/common';
import { Api } from '../../business/api/api';
import { Contants } from '../common/contants';
@Component({
  selector: 'message-service-portal',
  templateUrl: './message-service-portal.component.html',
  styleUrls: ['./message-service-portal.component.css'],
  providers: [ApiService, LogdataService, DialogService, ApiVersionService, ApplicationService, LogDataCodeService]
})

/**
 * @description: Coordinator quản lý bảng 'thông điệp trao đổi qua cổng dịch vụ'
 */
export class MessageServicePortalComponent implements OnInit {
  // >Quản lý page trả về từ server
  logdataInfo: MessageServicePortalInfo;
  logdatas: messageServicePortal[];
  currentPageView: number;
  fromNumber: number;
  toNumber: number;
  //.
  // >Liên quan tới message trả về từ server.
  responseMessage: ResponseMessage2;
  isHideErrorDeleting: boolean;
  //.
  // >filter search.
  filterForm: FormGroup;
  switchGetLogdatas = false;
  filterObject: messageServicePortal = new messageServicePortal();
  //.
  // >checker.
  checkAllItemFlag = false;
  apiVersionList: any;
  apis: Api[] = [];
  apiVersions: ApiVersion[] = [];
  applications: Application[] = [];
  logDataCodes: LogDataCode[] = [];

  apiSelections: Array<any> = [];
  apiVersionSelections: Array<any> = [];
  applicationSelections: Array<any> = [];
  logDataCodeSelections: Array<any> = [];

  PAGE_SIZE: number = 20;
  isData: boolean = false

  indexApiSelection: number;
  indexApiVersionSelection: number;
  indexApplicationSelection: number;
  indexCodeSelection: number;

  constructor(
    private apiService: ApiService,
    private logdataService: LogdataService,
    private apiVersionService: ApiVersionService,
    private applicationService: ApplicationService,
    private logDataCodeService: LogDataCodeService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    // initialize forms.
    this.initializeFilterForm();
    this.responseMessage = new ResponseMessage2();
    this.isHideErrorDeleting = false;
    // Get datas.
    this.search(this.filterObject, 0);

    this.binddingData()

    this.getApiList()

    this.getApplicationList()

    this.getLogDataList()
  }
  /**
   * @description: Hàm khởi tạo form
   */
  initializeFilterForm() {
    this.filterForm = LogdataForm.getSearchForm(this.fb);
  }

  binddingData() {
    let datetimeGroup: any = new Object();
    let now = new Date();
    let lastWeek = new Date(now.setDate(now.getDate() - Contants.DATE_FROM_TO));
    now = new Date();

    datetimeGroup.endDate = this.datePipe.transform(now, 'yyyy-MM-dd');
    datetimeGroup.endTime = this.datePipe.transform(now, 'HH:mm:ss');
    datetimeGroup.startDate = this.datePipe.transform(lastWeek, 'yyyy-MM-dd');
    datetimeGroup.startTime = '00:00:00';
    LogdataForm.binddingDataSaveLog(this.filterForm, datetimeGroup, this.filterObject);
  }

  /**
   * @description: Setting attribute để hiển thị phân trang.
   */
  private setCurrentPage() {
    if (this.logdataInfo.numberOfElements > 0) {
      this.currentPageView = this.logdataInfo.number + 1;
    } else {
      this.currentPageView = 0;
    }
    var numberOfElements = this.logdataInfo.numberOfElements;
    var size = this.logdataInfo.size;
    this.fromNumber = (this.currentPageView - 1) * size + 1;
    this.toNumber = (this.currentPageView - 1) * size + numberOfElements;
    if (this.toNumber < 1) {
      this.fromNumber = 0;
      this.toNumber = 0;
    }
  }

  /**
   * @description: Hàm lấy dữ liệu theo số trang
   * @param currentPage: số trang muốn lấy
   */
  findAll(currentPage: number) {
    this.logdataService.getLogdatas(currentPage, this.PAGE_SIZE).then(
      logdataInfo => {
        debugger;
        this.logdataInfo = logdataInfo;
        this.logdatas = this.logdataInfo.content;
        this.setCurrentPage();
      }).catch(
        error => {
          console.log(error);
        }
      );
  }

  /**
   * @description: hàm chuyển chuỗi thành định dạng ngày/tháng/năm.
   */
  convertStringtoDate(apiResponseTimeRequest: any) {
    let fromDate = new Date(apiResponseTimeRequest.startDate);
    var timeArr = apiResponseTimeRequest.startTime.split(':');
    if (!isNaN(fromDate.getDate()) && timeArr.length == 3) {
      fromDate.setHours(timeArr[0])
      fromDate.setMinutes(timeArr[1])
      fromDate.setSeconds(timeArr[2])
      apiResponseTimeRequest.startDate = this.datePipe.transform(fromDate, "yyyy-MM-dd HH:mm:ss");
    }

    let toDate = new Date(apiResponseTimeRequest.endDate);
    var timeArrT = apiResponseTimeRequest.endTime.split(':');
    if (!isNaN(toDate.getDate()) && timeArrT.length == 3) {
      toDate.setHours(timeArrT[0]);
      toDate.setMinutes(timeArrT[1])
      toDate.setSeconds(timeArrT[2])
      apiResponseTimeRequest.endDate = this.datePipe.transform(toDate, "yyyy-MM-dd HH:mm:ss");
    }
  }
  convertFormtoObject(apiUsageRequest: any) {
    apiUsageRequest.apiId = this.filterForm.get("apiId").value;
    apiUsageRequest.apiVersionId = this.filterForm.get("apiVersionId").value;
    apiUsageRequest.applicationId = this.filterForm.get("applicationId").value;
    apiUsageRequest.errorCode = this.filterForm.get("errorCode").value;
    apiUsageRequest.startDate = this.filterForm.get("startDate").value;
    apiUsageRequest.endDate = this.filterForm.get("endDate").value;
    apiUsageRequest.startTime = this.filterForm.get("startTime").value;
    apiUsageRequest.endTime = this.filterForm.get("endTime").value;
  }
  /**
   * @description: Hàm tìm kiếm
   * @param filterObject: Thông tin tìm kiếm
   * @param page: số trang muốn lấy
   */
  search(filterObject: any, page: number) {
    let filterObjectT = JSON.parse(localStorage.getItem(Contants.MESSAGE_SERVICE))
    if (Contants.isEmptyObject(filterObject) || Contants.isEmptyObject(filterObjectT)) {
      if(Contants.isEmptyObject(filterObject)) {
        localStorage.setItem(Contants.MESSAGE_SERVICE, JSON.stringify(filterObject))
      } else {
        filterObject = filterObjectT;
      }
      this.convertStringtoDate(filterObject);
    } else {
      filterObject = new Object();
      this.convertFormtoObject(filterObject);
      this.convertStringtoDate(filterObject);
    }

    this.filterObject = filterObject;
    console.log(this.filterObject)
    this.switchGetLogdatas = true;

    this.logdataService.filterSearch(filterObject, page, this.PAGE_SIZE)
      .then(logdataInfo => {
        console.log(logdataInfo)
        this.isData = true
        this.logdataInfo = logdataInfo;
        this.logdatas = this.logdataInfo.content;
        if(this.logdatas.length <= 0) {
          this.isData = false
        }
        console.log(this.logdatas)
        this.setCurrentPage();
      }).catch(error => {
        this.isData = false
        console.log(error)
      });
  }

  /**
   * @description: Coordinator quản lý việc chuyển trang
   * @param page: số trang
   */
  choosePageNumber(page) {
    var flag = true;
    var currentPage = this.logdataInfo.number;
    var pageNumber;
    if (page.valueAsNumber != null) {
      if (isNaN(page.valueAsNumber) || !Number.isInteger(page.valueAsNumber)) {
        flag = false;
        page.value = currentPage + 1;
        this.currentPageView = currentPage + 1;
      } else {
        pageNumber = page.valueAsNumber - 1;
      }
    } else {
      pageNumber = page;
    }

    if (flag == true && currentPage > pageNumber && pageNumber < 0) {
      pageNumber = 0;
      page.value = pageNumber + 1;
    }
    if (flag == true && currentPage < pageNumber && pageNumber > this.logdataInfo.totalPages - 1) {
      pageNumber = this.logdataInfo.totalPages - 1;
      page.value = pageNumber + 1;

    }
    if (flag == true) {
      currentPage = pageNumber;
      this.currentPageView = currentPage + 1;
      if (this.switchGetLogdatas == false)
        this.findAll(currentPage);
      else
        this.search(this.filterObject, currentPage);
    }
  }

  getApiList() {
    this.apiService.getListApi().then(response => {
      this.apis = response;
      this.apis.sort((a, b) => {
        if (a.apiName < b.apiName) return -1;
        else if (a.apiName > b.apiName) return 1;
        else return 0;
      });
      if(Contants.isEmptyObject(this.filterObject) &&
      this.filterObject.apiId) {
        this.initializeApiSelection(this.filterObject.apiId);
        this.getListApiVersion(this.filterObject.apiId)
      } else {
        this.initializeApiSelection(0);
      }
    });
  }
  /**
   * @description: Hàm khởi tạo danh sách dịch vụ.
   */
  initializeApiSelection(selectItem: number) {
    let api_datas = [];
    var countItems = 0;
    this.apis.forEach(element => {
      var item = {
        id: null, text: null
      };
      item.text = element.apiName;
      item.id = element.apiId;
      api_datas.push(item);
      if (item.id == selectItem) {
        this.indexApiSelection = countItems;
      }
      countItems += 1;
    });
    this.apiSelections = api_datas;
  }
  /**
   * @description: Hàm remove danh sách dịch vụ.
   */
  removeApiSelection() {
    this.apiVersionList = [];
    this.initializeApiVersionSelection(0);
  }
  /**
  * @description: Hàm lấy danh sách phiên bản dịch vụ
  */
  getListApiVersion(apiId: any) {
    this.apiVersionService.getListApiVersionByApiId(apiId)
      .then(response => {
        this.apiVersionList = response;
        this.apiVersionList.sort((a, b) => {
          if (a.apiVersion < b.apiVersion) return -1;
          else if (a.apiVersion > b.apiVersion) return 1;
          else return 0;
        });
        if(Contants.isEmptyObject(this.filterObject) &&
          this.filterObject.apiVersionId) {
          this.initializeApiVersionSelection(this.filterObject.apiVersionId)
        } else {
          this.initializeApiVersionSelection(0);
        }
      })
      .catch(error => console.log(error));
  }
  /**
   * @description: Hàm khởi tạo danh sách phiên bản dịch vụ.
   */
  initializeApiVersionSelection(selectItem: number) {
    let apiVersion_datas = [];
    var countItems = 0;
    this.apiVersionList.forEach(element => {
      var item = {
        id: null, text: null
      };
      item.text = element.apiVersion;
      item.id = element.apiVersionId;
      apiVersion_datas.push(item);
      if (item.id == selectItem) {
        this.indexApiVersionSelection = countItems;
      }
      countItems += 1;
    });
    this.apiVersionSelections = apiVersion_datas;
  }
  getApplicationList() {
    this.applicationService.getListApplication().then(response => {
      this.applications = response;
      this.applications.sort((a, b) => {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        else return 0;
      });
      if(Contants.isEmptyObject(this.filterObject) &&
          this.filterObject.applicationId) {
          this.initializeApplicationSelection(this.filterObject.applicationId)
        } else {
          this.initializeApplicationSelection(0);
        }
    });
  }
  /**
   * @description: Hàm khởi tạo danh sách ứng dụng.
   */
  initializeApplicationSelection(selectItem: number) {
    let application_datas = [];
    var countItems = 0;
    this.applications.forEach(element => {
      var item = {
        id: null, text: null
      };
      item.text = element.name;
      item.id = element.applicationId;
      application_datas.push(item);
      if (item.id == selectItem) {
        this.indexApplicationSelection = countItems;
      }
      countItems += 1;
    });
    this.applicationSelections = application_datas;
  }
  
  getLogDataList() {
    this.logDataCodeService.getListLogDataCode().then(response => {
      this.logDataCodes = response;
      this.logDataCodes.sort((a, b) => {
        if (a.code < b.code) return -1;
        else if (a.code > b.code) return 1;
        else return 0;
      });
      console.log(this.filterObject.errorCode)
      if(Contants.isEmptyObject(this.filterObject) &&
          this.filterObject.errorCode) {
          this.initializeLogDataCodeSelection(this.filterObject.errorCode)
        } else {
          this.initializeLogDataCodeSelection(0);
        }
    });
  }
  /**
   * @description: Hàm khởi tạo danh sách mã lỗi.
   */
  initializeLogDataCodeSelection(selectItem: number) {
    let logDataCode_datas = [];
    var countItems = 0;
    this.logDataCodes.forEach(element => {
      var item = {
        id: null, text: null
      };
      item.text = element.code + " - " + element.reason;
      item.id = element.amLogDataCodeId;
      logDataCode_datas.push(item);
      
      if (item.id == selectItem) {
        this.indexCodeSelection = countItems;
        console.log(this.indexCodeSelection)
      }
      countItems += 1;
    });
    this.logDataCodeSelections = logDataCode_datas;
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
}