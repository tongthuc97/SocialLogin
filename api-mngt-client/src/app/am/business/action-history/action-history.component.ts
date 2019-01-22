import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseMessage2Component } from '../../common/util/response-message-2/response-message-2.component';
import { ActionHistoryService } from './action-history.service';
import { DialogService } from '../../common/dialog/dialog.service';
import { ActionHistoryForm } from './action-history-form';
import { ActionHistoryInfo } from './action-history-info';
import { ActionHistory } from './action-history';
import { ResponseMessage2 } from '../../common/util/response-message-2/response-message-2';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ActionHistoryCommon } from './action-history-common';

@Component({
  selector: 'app-action-history',
  templateUrl: './action-history.component.html',
  styleUrls: ['./action-history.component.css']
})

/**
 * @description: Coordinator quản lý bảng 'Department'
 */
export class ActionHistoryComponent implements OnInit {
   // >Quản lý page trả về từ server
  actionHistoryInfo: ActionHistoryInfo;
  actionHistories: ActionHistory[];
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
  switchGetActionHistories = false;
  filterObject: ActionHistory;
  actions = ActionHistoryCommon.getActionHistoryActionField();
  modules = ActionHistoryCommon.getActionHistoryModuleField();

  constructor(
    private actionHistoryService: ActionHistoryService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.filterForm = ActionHistoryForm.getUpdateForm(this.fb);
    this.filterForm.patchValue({
      action: "",
      module: ""
    });
    this.initializeFilterForm();
    this.initializeResponseMessage();
    this.findAll(0);
  }

  initializeFilterForm(){
    this.filterForm = ActionHistoryForm.getUpdateForm(this.fb);
    this.filterForm.patchValue({
      userName: '',
      action: '',
      module: ''
    });
  }

  initializeResponseMessage(){
    this.responseMessage = new ResponseMessage2();
    this.isHideErrorDeleting = false;
  }

  /**
   * @description: Setting attribute để hiển thị phân trang.
   */
  private setCurrentPage() {
    if (this.actionHistoryInfo.numberOfElements > 0) {
      this.currentPageView = this.actionHistoryInfo.number + 1;
    } else {
      this.currentPageView = 0;
    }
    var numberOfElements = this.actionHistoryInfo.numberOfElements;
    var size = this.actionHistoryInfo.size;
    this.fromNumber = (this.currentPageView - 1)*size + 1;
    this.toNumber = (this.currentPageView - 1)*size + numberOfElements;
    if(this.toNumber < 1){
      this.fromNumber = 0;
      this.toNumber = 0;
    }
  }

  /**
   * @description: Hàm gọi từ dữ liệu bảng 'Department' theo số trang
   * @param currentPage: số trang muốn lấy
   */
  findAll(currentPage: number) {
    this.actionHistoryService.findAll(currentPage).then(
      actionHistoryInfo => {
        this.actionHistoryInfo = actionHistoryInfo;
        this.actionHistories = this.actionHistoryInfo.content;
        this.setCurrentPage();
      }).catch(
      error => {
        console.log(error);
      }
      );
  }

  /**
   * @description: Hàm tìm kiếm
   * @param department: Thông tin tìm kiếm
   * @param page: số trang muốn lấy
   */
  search(actionHistory: ActionHistory, page: number) {
    this.filterObject = actionHistory;
    this.switchGetActionHistories = true;
    this.actionHistoryService.filterSearch(actionHistory, page)
      .then(actionHistoryInfo => {
        this.actionHistoryInfo = actionHistoryInfo;
        this.actionHistories = this.actionHistoryInfo.content;
        this.setCurrentPage();
      });
  }

  /**
   * @description: Coordinator quản lý việc chuyển trang
   * @param page: số trang
   */
  choosePageNumber(page: number) {
    var flag = false;
    var currentPage = this.actionHistoryInfo.number;
    if (currentPage > page) {
      if (this.actionHistoryInfo.first == false) {
        flag = true;
      }
    } else if (currentPage < page) {
      if (this.actionHistoryInfo.last == false) {
        flag = true;
      }
    } else {
      flag = true;
    }
    if (flag == true) {

      if (this.switchGetActionHistories == false)
        this.findAll(page);
      else
        this.search(this.filterObject, page);
    }
  }
}

