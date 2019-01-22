import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseMessageComponent } from '../../common/util/response-message/response-message.component';
import { ApiLc } from './api-lc';
import { ApiLcInfo } from './api-lc-info';
import { ApiLcService } from './api-lc.service';
import { DialogService } from '../../common/dialog/dialog.service';
import { ResponseMessage2 } from '../../common/util/response-message-2/response-message-2';


@Component({
  selector: 'app-api-lc',
  templateUrl: './api-lc.component.html',
  styleUrls: ['./api-lc.component.css'],
  providers: [ApiLcService, DialogService]
})

/**
 * @description: Coordinator quản lý bảng 'ApiLc'
 */
export class ApiLcComponent implements OnInit {
  // >Quản lý page trả về từ server
  apiLcInfo: ApiLcInfo;
  apiLcs: ApiLc[];
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
  switchGetMinistries = false;
  filterObject: any;
  //.
  // >checker.
  checkAllItemFlag = false;
  statuses = [
    {
      id: '',
      value: "All"
    },
    {
      id: 1,
      value: "Actived"
    },
    {
      id: 0,
      value: "Deactived"
    }];

  constructor(
    private apiLcService: ApiLcService,
    private dialogService: DialogService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // initialize forms.
    this.responseMessage = new ResponseMessage2();
    this.isHideErrorDeleting = false;
    // get datas.
    this.findAll(0);
  }

  private setCurrentPage() {
    if (this.apiLcInfo.numberOfElements > 0) {
      this.currentPageView = this.apiLcInfo.number + 1;
    } else {
      this.currentPageView = 0;
    }
    var numberOfElements = this.apiLcInfo.numberOfElements;
    var size = this.apiLcInfo.size;
    this.fromNumber = (this.currentPageView - 1)*size + 1;
    this.toNumber = (this.currentPageView - 1)*size + numberOfElements;
    if(this.toNumber < 1){
      this.fromNumber = 0;
      this.toNumber = 0;
    }
  }

  /**
   * @description: Hàm gọi từ dữ liệu bảng 'Ministry' theo số trang
   * @param currentPage: số trang muốn lấy
   */
  findAll(currentPage: number) {
    this.apiLcService.getApiLcs(currentPage).then(
      apiLcInfo => {
        this.apiLcInfo = apiLcInfo;
        this.apiLcs = this.apiLcInfo.content;
        //console.log(this.ipConditionInfo);
        this.setCurrentPage();
      }).catch(
      error => {
        console.log(error);
      }
      );
  }

  /**
   * @description: Hàm tìm kiếm
   * @param conditionGroup: Thông tin tìm kiếm
   * @param page: số trang muốn lấy
   */
  search(apiLc: any, page: number) {
    this.filterObject = apiLc;
    this.switchGetMinistries = true;
    this.apiLcService.filterSearch(apiLc, page)
      .then(apiLcInfo => {
        this.apiLcInfo = apiLcInfo;
        this.apiLcs = this.apiLcInfo.content;
        this.setCurrentPage();
      });
  }
}