import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTable } from 'angular2-datatable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { ApiVersion } from './api-version';
import { ApiVersionService } from './api-version.service';
import { ApiVersionPageInfo } from './api-version-info';
import { ApiVersionForm } from './api-version-form';
import { ApiService } from '../../api.service';
import { DialogService } from '../../../../common/dialog/dialog.service';
import { Policy } from '../../../policy/policy';
import { Api } from '../../api';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyService } from '../../../policy/policy.service';
import { AuthGuardSubmenu } from '../../../../../authentication/guard/auth.guard-submenu';
import { SubscriptionService } from '../../../subscription/subscription.service';
import { Subscription } from '../../../subscription/subscription';
import { TranslateService } from '@ngx-translate/core';
import { CommonUtil } from '../../../../common/util/common-util';

@Component({
  selector: 'app-api-version',
  templateUrl: './api-version.component.html',
  styleUrls: ['./api-version.component.css'],
  providers: [ApiVersionService, ApiService, PolicyService, SubscriptionService, DialogService, DataTable]
})

/**
 * @description: Coordinator quản lý bảng 'ApiVersion'
 */
export class ApiVersionComponent implements OnInit {
  // >Quản lý page trả về từ server
  apiVersionInfo: ApiVersionPageInfo;
  apiVersions: ApiVersion[];
  totalPages: number;
  currentPage = 0;
  pageLength: number;
  totalElements: number;
  apiVersionIdParam: any;
  // >Liên quan tới message trả về từ server.
  responseMessage: string;
  httpStatus: number;
  task: string;
  // >filter search.
  filterForm: FormGroup;
  switchGetApiVersions = false;
  filterObject: ApiVersion;
  //.
  // >checker.
  checkAllItemFlag = false;
  currentPageView: number;
  fromNumber: number;
  toNumber: number;

  numberDeleteItems = 0;

  states = CommonUtil.getListApiState();

  apis: Api[];
  policies: Policy[];
  subscriptions: Subscription[];
  apiIdParam: number;
  apiVersionId: number;

  constructor(
    private apiVersionService: ApiVersionService,
    private apiService: ApiService,
    private policyService: PolicyService,
    private dialogService: DialogService,
    private subscriptionService: SubscriptionService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authGuardSubmenu: AuthGuardSubmenu,
    private translate: TranslateService,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) { this.toastr.setRootViewContainerRef(vcr); }

  ngOnInit() {
    // initialize forms.
    this.filterForm = ApiVersionForm.getUpdateForm(this.fb);
    this.filterForm.patchValue({
      currentState: -1,
    });

    //Get data for binding to select
    this.getListApi();
    this.getListPolicy();
    this.getApiIdParam();
  }

  getApiIdParam() {
    this.apiVersionId = +this.route.snapshot.parent.params['apiVersionId'];
    this.apiVersionService.findOne(this.apiVersionId)
      .then(apiVersion => {
        this.filterObject = new ApiVersion();
        this.apiIdParam = apiVersion.amApi.apiId;
        this.search(this.filterObject, 0);
      });

  }
  getListApi() {
    this.apiService.getListApi().then(
      apis => {
        this.apis = apis;
      });
  }
  getListPolicy() {
    this.policyService.getApiPolicy().then(
      policies => {
        this.policies = policies;
      });
  }

  /**
   * @description: Hàm tìm kiếm
   * @param apiVersion: Thông tin tìm kiếm
   * @param page: số trang muốn lấy
   */
  search(apiVersion: ApiVersion, page: number) {
    this.filterObject = apiVersion;
    apiVersion.amApi.apiId = this.apiIdParam;
    this.apiVersionService.advanceSearchApiVersion(apiVersion, page)
      .then(apiVersionInfo => {
        this.apiVersionInfo = apiVersionInfo;
        this.apiVersions = this.apiVersionInfo.content;
        this.setCurrentPage();
      });
    this.numberDeleteItems = 0;
  }

  /**
   * @description: Coordinator quản lý việc chuyển trang
   * @param page: số trang
   */
  choosePageNumber(page: number) {
    var flag = false;
    if (this.currentPage > page) {
      if (this.apiVersionInfo.first == false) {
        flag = true;
      }
    } else if (this.currentPage < page) {
      if (this.apiVersionInfo.last == false) {
        flag = true;
      }
    } else {
      flag = true;
    }
    if (flag == true) {
      this.currentPage = page;
      this.search(this.filterObject, this.currentPage);
    }
    this.numberDeleteItems = 0;
  }
  private setCurrentPage() {
    if (this.apiVersionInfo.numberOfElements > 0) {
      this.currentPageView = this.apiVersionInfo.number + 1;
    } else {
      this.currentPageView = 0;
    }
    var numberOfElements = this.apiVersionInfo.numberOfElements;
    var size = this.apiVersionInfo.size;
    this.fromNumber = (this.currentPageView - 1) * size + 1;
    this.toNumber = (this.currentPageView - 1) * size + numberOfElements;
    if (this.toNumber < 1) {
      this.fromNumber = 0;
      this.toNumber = 0;
    }
  }
  /**
   * @description: Dùng để xóa 1 bản ghi
   * @param apiVersionId 
   */
  delete(item: ApiVersion) {
    item.checked = true;
    this.dialogService
      .confirm('Confirm Information', 'Are you sure to delete?')
      .subscribe(response => {
        if (response == true) {
          this.task = "Delete";
          this.subscriptionService.findByApiVersionId(item.apiVersionId).then(subscriptionInfo => {
            this.subscriptions = subscriptionInfo;
            if (this.subscriptions != null && this.subscriptions.length > 0) {
              this.toastr.error('', 'Api has related application!', { dismiss: 'controlled' })
                .then((toast: Toast) => {
                  setTimeout(() => {
                    this.toastr.dismissToast(toast);
                  }, 3000);
                });
            } else {
              this.apiVersionService.delete(item.apiVersionId)
                .then(response => {
                  this.responseMessage = response;
                  this.httpStatus = response;
                  this.search(this.filterObject, this.apiVersionInfo.number);
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
                  this.search(this.filterObject, this.currentPage);
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
                  this.responseMessage = error;
                  this.httpStatus = error.status;
                });
            }
          });
        } else {
          item.checked = false;
        }
      })
  }

  /**
   * @description: Check tất cả items khi click ô checkbox all.
   */
  checkAllItem() {
    this.checkAllItemFlag = !this.checkAllItemFlag;
    this.apiVersions.forEach(item => {
      item.checked = this.checkAllItemFlag;
    });
  }

  /**
   * @description: Xóa các items được chọn.
   */
  deleteCheckedItems() {
    var entityIds = [];
    this.apiVersions.forEach(item => {
      if (item.checked == true) {
        entityIds.push(item.apiVersionId);
      }
    });
    if (entityIds.length > 0) {
      this.dialogService.confirm('Confirm Information', 'Are you sure to delete?')
        .subscribe(response => {
          if (response == true) {
            this.task = "Delete";
            this.apiVersionService.deleteAllBatch(entityIds)
              .then(response => {
                this.responseMessage = response;
                this.httpStatus = response;
                this.checkAllItemFlag = false;
                this.choosePageNumber(this.currentPage);
                this.toastr.success('', 'Deleted successfully!', { dismiss: 'controlled' })
                  .then((toast: Toast) => {
                    setTimeout(() => {
                      this.toastr.dismissToast(toast);
                    }, 3000);
                  });
              })
              .catch(error => {
                if (error.message == "Some objects had children") {
                  this.toastr.error('', 'Api has related application!', { dismiss: 'controlled' })
                    .then((toast: Toast) => {
                      setTimeout(() => {
                        this.toastr.dismissToast(toast);
                      }, 3000);
                    });
                } else {
                  this.checkAllItemFlag = false;
                  this.responseMessage = error;
                  this.httpStatus = error.status;
                  this.choosePageNumber(this.currentPage);
                  this.toastr.error('', 'Delete process failed!', { dismiss: 'controlled' })
                    .then((toast: Toast) => {
                      setTimeout(() => {
                        this.toastr.dismissToast(toast);
                      }, 3000);
                    });
                }
              });
          }
        })
    } else {
      this.toastr.info('You have not selected any records to delete.', 'Information!', { dismiss: 'controlled' })
        .then((toast: Toast) => {
          setTimeout(() => {
            this.toastr.dismissToast(toast);
          }, 3000);
        });
    }
  }

  countNumberDeleteItems() {
    this.numberDeleteItems = 0;
    this.apiVersions.forEach(item => {
      if (item.checked == true) {
        this.numberDeleteItems += 1;
      }
    });
  }

  getNumberDeleteItems(): number {
    return this.numberDeleteItems;
  }

  // To Authorize User
  isAuthoriziedNavigation(): boolean {
    var isAuthorizied = this.authGuardSubmenu.isAuthoriziedWithCurrentUrl(this.router.url);
    return isAuthorizied;
  }

  getApiStateById(id: number): string {
    return CommonUtil.getApiStateById(id);
  }
}
