import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseMessageComponent } from '../../common/util/response-message/response-message.component';
import { ApiForm } from '../api/api-form.component';

import { DialogService } from '../../common/dialog/dialog.service';
import { ApiVersionService } from '../api/api-detail/api-version/api-version.service';
import { DataTable } from 'angular2-datatable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TaskInfo } from './task-info';
import { Task } from './task';
import { ApiProcessService } from './api-process.service';
import { ProcessDialogService } from './dialog/process-dialog.service';
import { TaskMultipleDTO } from './task-multiple-DTO';


@Component({
  selector: 'app-api-process',
  templateUrl: './api-process.component.html',
  providers: [DialogService, ProcessDialogService, ApiVersionService, ApiProcessService, AuthGuardSubmenu]
})

/**
 * @description: Coordinator quản lý bảng 'ApiLc'
 */
export class ApiProcessComponent implements OnInit {
  taskInfo: TaskInfo;
  tasks: Task[];
  states = [
    { id: 0, value: 'Created' },
    { id: 1, value: 'Published' },
    { id: 2, value: 'Blocked' },
    { id: 3, value: 'Deprecated' },
    { id: 4, value: 'Retired' }
  ];

  // >filter search.
  filterForm: FormGroup;
  switchGetApiVersions = false;
  //.
  // >checker.
  checkAllItemFlag = false;
  currentPageView: number;
  fromNumber: number;
  toNumber: number;
  numberDeleteItems = 0;

  //checked
  constructor(
    private apiProcessService: ApiProcessService,
    private apiVersionService: ApiVersionService,
    private dialogService: DialogService,
    private processDialogService: ProcessDialogService,
    private fb: FormBuilder,
    private router: Router,
    private authGuardSubmenu: AuthGuardSubmenu,
    private translate: TranslateService,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) { this.toastr.setRootViewContainerRef(vcr); }

  ngOnInit() {
    this.findAllApiVersion(0);
  }


  findAllApiVersion(currentPage: number) {
    this.apiProcessService.getListTask(currentPage).then(
      taskInfo => {
        this.taskInfo = taskInfo;
        this.tasks = this.taskInfo.content;
        this.setCurrentPage();
        this.countNumberDeleteItems();
      }).catch(
      error => {
        console.log(error);
      }
      );
  }

  /**
   * @description: 
   * @param page: 
   */
  choosePageNumber(page: number) {
    var flag = false;
    var currentPage = this.taskInfo.number;
    if (currentPage > page) {
      if (this.taskInfo.first == false) {
        flag = true;
      }
    } else if (currentPage < page) {
      if (this.taskInfo.last == false) {
        flag = true;
      }
    } else {
      flag = true;
    }
    if (flag == true) {
      this.findAllApiVersion(page);
    }
  }

  private setCurrentPage() {
    if (this.taskInfo.numberOfElements > 0) {
      this.currentPageView = this.taskInfo.number + 1;
    } else {
      this.currentPageView = 0;
    }
    var numberOfElements = this.taskInfo.numberOfElements;
    var size = this.taskInfo.size;
    this.fromNumber = (this.currentPageView - 1) * size + 1;
    this.toNumber = (this.currentPageView - 1) * size + numberOfElements;
    if (this.toNumber < 1) {
      this.fromNumber = 0;
      this.toNumber = 0;
    }
  }

  // To Authorize User
  isAuthoriziedNavigation(): boolean {
    var isAuthorizied = this.authGuardSubmenu.isAuthoriziedWithCurrentUrl(this.router.url);
    return isAuthorizied;
  }

  checkAllItem() {
    this.checkAllItemFlag = !this.checkAllItemFlag;
    this.tasks.forEach(item => {
      item.checked = this.checkAllItemFlag;
    });
  }

  processMultipleTask() {
    var listTaskProcess = [];
    var listTaskId = [];
    var isSame = true;
    this.tasks.forEach(item => {
      if (item.checked == true) {
        listTaskProcess.push(item);
        listTaskId.push(item.id);
      }
    });
    // check task is same
    for (let i = 0; i < listTaskProcess.length; i++) {
      for (let j = i; j < listTaskProcess.length; j++) {
        if (listTaskProcess[i].name != listTaskProcess[j].name) {
          isSame = false;
          break;
        }
      }
    }
    if (!isSame) {
      this.toastr.error('', 'Vui lòng chọn các task giống nhau.', { dismiss: 'controlled' })
        .then((toast: Toast) => {
          setTimeout(() => {
            this.toastr.dismissToast(toast);
          }, 3000);
        });
    }
    if (listTaskProcess.length > 0 && isSame) {
      this.processDialogService.confirm(listTaskProcess[0].id)
        .subscribe(response => {
          if (response != undefined) {
            var taskMultipleDTO: TaskMultipleDTO = new TaskMultipleDTO();
            taskMultipleDTO.taskIds = listTaskId;
            taskMultipleDTO.state = response;
            taskMultipleDTO.processContent = '';

            this.apiProcessService.processMultipleTask(taskMultipleDTO)
              .then(response => {
                this.checkAllItemFlag = false;
                this.choosePageNumber(this.taskInfo.number);
                this.toastr.success('', 'Process successfully!', { dismiss: 'controlled' })
                  .then((toast: Toast) => {
                    setTimeout(() => {
                      this.toastr.dismissToast(toast);
                    }, 3000);
                  });
              })
              .catch(error => {
                this.checkAllItemFlag = false;
                this.choosePageNumber(this.taskInfo.number);
                this.toastr.error('', 'Process failed!', { dismiss: 'controlled' })
                  .then((toast: Toast) => {
                    setTimeout(() => {
                      this.toastr.dismissToast(toast);
                    }, 3000);
                  });
              });
          }
        })
    }
    this.countNumberDeleteItems();
  }

  countNumberDeleteItems() {
    this.numberDeleteItems = 0;
    this.tasks.forEach(item => {
      if (item.checked == true) {
        this.numberDeleteItems += 1;
      }
    });
  }

  getNumberDeleteItems(): number {
    return this.numberDeleteItems;
  }

}