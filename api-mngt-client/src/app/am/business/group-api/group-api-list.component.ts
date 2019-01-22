import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { GroupApi } from './group-api';
import { DialogService } from '../../common/dialog/dialog.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { GroupApiPageInfo } from './group-api-PageInfo';
import { GroupApiForm } from './group-api-form.component';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonUtil } from '../../common/util/common-util';
import { GroupApiService } from './group-api.service';
import { debug } from 'util';


@Component({
  selector: 'app-group-api-list',
  templateUrl: './group-api-list.component.html',
})

/**
 * @description:
 */
export class GroupApiListComponent implements OnInit {
  /** the api version page infomation */
  groupApiInfo: GroupApiPageInfo;
  /** the list groupApis */
  groupApis: GroupApi[] = [];
  /** the selections of groupApis */
  groupApiSelections: Array<any> = [];

  /** the search form */
  filterForm: FormGroup;

  /** the search object */
  filterObject: GroupApi;

  /** checker */
  checkAllItemFlag = false;
  /** the current page */
  currentPage = 0;

  currentPageView: number;
  /** the from number */
  fromNumber: number;
  /** the to number*/
  toNumber: number;
  /** the number of the selected items */
  numberDeleteItems = 0;

  listStatus = CommonUtil.getListStatus();
  constructor(
    private groupApiService: GroupApiService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    private router: Router,
    private authGuardSubmenu: AuthGuardSubmenu,
    private translate: TranslateService,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) { this.toastr.setRootViewContainerRef(vcr); }

  ngOnInit() {

    // initialize search object
    this.filterObject = new GroupApi();
    // initialize filter form.
    this.filterForm = GroupApiForm.getUpdateForm(this.fb);
    this.filterForm.patchValue({
      applicationStatus: '',
      name: '',
    });
    this.search(this.filterObject, 0);
    // get list of select data
    this.getAllGroupApi();
  }


  search(groupApi: GroupApi, page: number) {
    this.filterObject = groupApi;
    this.filterObject.id = null;
    this.groupApiService.advanceSearchType(groupApi, page)
      .then(groupApiInfo => {
        this.groupApiInfo = groupApiInfo;
        this.groupApis = this.groupApiInfo.content;
        this.setCurrentPage();
      });
  }

  /**
   * @description: 
   * @param page: 
   */
  choosePageNumber(page: number) {
    var flag = false;
    var currentPage = this.groupApiInfo.number;
    if (currentPage > page) {
      if (this.groupApiInfo.first == false) {
        flag = true;
      }
    } else if (currentPage < page) {
      if (this.groupApiInfo.last == false) {
        flag = true;
      }
    } else {
      flag = true;
    }
    if (flag == true) {
      this.search(this.filterObject, page);
    }
  }

  private setCurrentPage() {
    if (this.groupApiInfo.numberOfElements > 0) {
      this.currentPageView = this.groupApiInfo.number + 1;
    } else {
      this.currentPageView = 0;
    }
    var numberOfElements = this.groupApiInfo.numberOfElements;
    var size = this.groupApiInfo.size;
    this.fromNumber = (this.currentPageView - 1) * size + 1;
    this.toNumber = (this.currentPageView - 1) * size + numberOfElements;
    if (this.toNumber < 1) {
      this.fromNumber = 0;
      this.toNumber = 0;
    }
  }
  /**
   * @description: 
   * @param groupApi 
   */
  delete(groupApi: GroupApi) {
    groupApi.checked = true;
    this.dialogService
      .confirm('Confirm Information', 'Are you sure to delete?')
      .subscribe(response => {
        if (response == true) {
          this.groupApiService.deleteGroupApi(groupApi.id)
            .then(response => {
              let message;
              this.translate.get('Message.DeleteSuccess').subscribe((res: string) => {
                message = res;
              });
              this.toastr.success('', message, { dismiss: 'controlled' })
                .then((toast: Toast) => {
                  setTimeout(() => {
                    this.toastr.dismissToast(toast);
                  }, 3000);
                });
              this.choosePageNumber(this.currentPage);
            })
            .catch(error => {
              let message;
              this.translate.get('Message.DeleteFail').subscribe((res: string) => {
                message = res;
              });
              this.toastr.error('', message, { dismiss: 'controlled' })
                .then((toast: Toast) => {
                  setTimeout(() => {
                    this.toastr.dismissToast(toast);
                  }, 3000);
                });
            });
        } else {
          groupApi.checked = false;
        }
      })
  }
  /**
   * @description: 
   */
  checkAllItem() {
    this.checkAllItemFlag = !this.checkAllItemFlag;
    this.groupApis.forEach(item => {
      item.checked = this.checkAllItemFlag;
    });
  }

  /**
   * @description: 
   */
  deleteCheckedItems() {
    var entityIds = [];
    this.groupApis.forEach(item => {
      if (item.checked == true) {
        entityIds.push(item.id);
      }
    });
    if (entityIds.length > 0) {
      this.dialogService.confirm('Confirm Information', 'Are you sure to delete?')
        .subscribe(response => {
          if (response == true) {
            var currentPage = this.groupApiInfo.number;
            this.groupApiService.deleteAllBatch(entityIds)
              .then(response => {
                this.checkAllItemFlag = false;
                this.choosePageNumber(currentPage);
                let message;
                this.translate.get('Message.DeleteSuccess').subscribe((res: string) => {
                  message = res;
                });
                this.toastr.success('', message, { dismiss: 'controlled' })
                  .then((toast: Toast) => {
                    setTimeout(() => {
                      this.toastr.dismissToast(toast);
                      this.search(this.filterObject, 0)
                    }, 2000);
                  });
              })
              .catch(error => {
                if (error.message == "Some objects had children") {
                  this.toastr.error('', 'Api has related groupApi!', { dismiss: 'controlled' })
                    .then((toast: Toast) => {
                      setTimeout(() => {
                        this.toastr.dismissToast(toast);
                      }, 3000);
                    });
                } else {
                  this.checkAllItemFlag = false;
                  this.choosePageNumber(currentPage);
                  let message;
                  this.translate.get('Message.DeleteFail').subscribe((res: string) => {
                    message = res;
                  });
                  this.toastr.error('', message, { dismiss: 'controlled' })
                    .then((toast: Toast) => {
                      setTimeout(() => {
                        this.toastr.dismissToast(toast);
                      }, 2000);
                    });
                }
              });
          }
        })
    }
  }

  countNumberDeleteItems() {
    this.numberDeleteItems = 0;
    this.groupApis.forEach(item => {
      if (item.checked == true) {
        this.numberDeleteItems += 1;
      }
    });
  }

  getNumberDeleteItems(): number {
    return this.numberDeleteItems;
  }

  getAllGroupApi() {
    this.groupApiService.getListGroupApi()
      .then(response => {
        this.groupApis = response.data;
       console.log( this.groupApis)
        this.initializeGroupApiSelection();
      });
     
  }

  initializeGroupApiSelection() {
    let group_api_datas = [];
    this.groupApis.forEach(element => {
      var item = {
        id: null, text: null
      };
      item.text = element.name;
      item.id = element.id;
      group_api_datas.push(item);
    });
    this.groupApiSelections = group_api_datas;
  }

  // To Authorize User
  isAuthoriziedNavigation(): boolean {
    var isAuthorizied = this.authGuardSubmenu.isAuthoriziedWithCurrentUrl(this.router.url);
    return isAuthorizied;
  }

  getListStatusById(id: number) {
    return CommonUtil.getStatusById(id);
  }
}
