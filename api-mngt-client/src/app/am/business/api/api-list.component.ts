import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DialogService } from '../../common/dialog/dialog.service';
import { ApiVersionService } from './api-detail/api-version/api-version.service';
import { Policy } from '../policy/policy';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { Api } from './Api';
import { ApiVersionPageInfo } from './api-detail/api-version/api-version-info';
import { ApiVersionForm } from './api-detail/api-version/api-version-form';
import { ApiVersion } from './api-detail/api-version/api-version';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SubscriptionService } from '../subscription/subscription.service';
import { ApiProcessService } from '../api-process/api-process.service';
import { CommonUtil } from '../../common/util/common-util';
import { PolicyService } from '../policy/policy.service';


@Component({
  selector: 'app-api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.css']
})

/**
 * @description:
 */
export class ApiListComponent implements OnInit {

  /** the api version page infomation */
  apiVersionInfo: ApiVersionPageInfo;
  /** the list data of apiversion page info */
  apiVersions: ApiVersion[];
  /** the list of policies*/
  policies: Policy[];
  /** the selections of polices */
  policySelections: Array<any> = [];
  /** the list states */
  states = CommonUtil.getListApiState();
  /** the list apis */
  apis: ApiVersion[];
  /** the selections of apis */
  apiSelections: Array<any> = [];

  /** the search form */
  filterForm: FormGroup;

  /** the search object */
  filterObject: ApiVersion;

  /** checker */
  checkAllItemFlag = false;
  /** the current page */
  currentPageView: number;
  /** the from number */
  fromNumber: number;
  /** the to number*/
  toNumber: number;
  /** the number of the selected items */
  numberDeleteItems = 0;

  constructor(
    private apiVersionService: ApiVersionService,
    private apiProcessService: ApiProcessService,
    private policyService: PolicyService,
    private subscriptionService: SubscriptionService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    private router: Router,
    private authGuardSubmenu: AuthGuardSubmenu,
    private translate: TranslateService,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) { this.toastr.setRootViewContainerRef(vcr); }

  ngOnInit() {

    // initialize search object
    this.filterObject = new ApiVersion();
    this.filterObject.currentState = -1;
    // initialize filter form.
    this.filterForm = ApiVersionForm.getUpdateForm(this.fb);
    // get data
    this.search(this.filterObject, 0);
    // get list of select data
    this.getListPolicy();
    // get list of select data
    this.getAllApis();
  }

  getListPolicy() {
    this.policyService.getApiPolicy().then(
      policies => {
        this.policies = policies;
        this.initializePolicySelection();
      });
  }

  initializePolicySelection() {
    let policy_datas = [];
    this.policies.forEach(element => {
      var item = {
        id: null, text: null
      };
      item.text = element.displayName;
      item.id = element.amPolicyId;
      policy_datas.push(item);
    });
    this.policySelections = policy_datas;
  }

  search(apiVersion: ApiVersion, page: number) {
    this.filterObject = apiVersion;
    this.apiVersionService.advanceSearchApiVersion(apiVersion, page)
      .then(apiVersionInfo => {
        this.apiVersionInfo = apiVersionInfo;
        this.apiVersions = this.apiVersionInfo.content;
        this.setCurrentPage();
      });
  }

  /**
   * @description: 
   * @param page: 
   */
  choosePageNumber(page: number) {
    var flag = false;
    var currentPage = this.apiVersionInfo.number;
    if (currentPage > page) {
      if (this.apiVersionInfo.first == false) {
        flag = true;
      }
    } else if (currentPage < page) {
      if (this.apiVersionInfo.last == false) {
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
   * @description: 
   * @param apiId 
   */
  delete(apiVersion: ApiVersion) {
    apiVersion.checked = true;
    this.dialogService
      .confirm('Confirm Information', 'Are you sure to delete?')
      .subscribe(response => {
        if (response == true) {
          this.subscriptionService.findByApiVersionId(apiVersion.apiVersionId).then(subscriptionInfo => {
            if (subscriptionInfo != null && subscriptionInfo.length > 0) {
              this.toastr.error('', 'Api has related application!', { dismiss: 'controlled' })
                .then((toast: Toast) => {
                  setTimeout(() => {
                    this.toastr.dismissToast(toast);
                  }, 3000);
                });
            } else {
              this.apiVersionService.delete(apiVersion.apiVersionId)
                .then(response => {
                  this.search(this.filterObject, this.apiVersionInfo.number);
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
                  apiVersion.checked = false;
                });
            }
          });
        } else {
          apiVersion.checked = false;
        }
      })
  }

  /**
   * @description: 
   */
  checkAllItem() {
    this.checkAllItemFlag = !this.checkAllItemFlag;
    this.apiVersions.forEach(item => {
      item.checked = this.checkAllItemFlag;
    });
  }

  /**
   * @description: 
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
            var currentPage = this.apiVersionInfo.number;
            this.apiVersionService.deleteAllBatch(entityIds)
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
                  this.toastr.error('', 'Api has related application!', { dismiss: 'controlled' })
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
    this.apiVersions.forEach(item => {
      if (item.checked == true) {
        this.numberDeleteItems += 1;
      }
    });
  }

  getNumberDeleteItems(): number {
    return this.numberDeleteItems;
  }

  getAllApis() {
    this.apiVersionService.getListApiVersion()
      .then(response => {
        this.apis = response;
        this.initializeApiSelection();
      })
      .catch(error => console.log(error));
  }

  initializeApiSelection() {
    let api_datas = [];
    this.apis.forEach(element => {
      var item = {
        id: null, text: null
      };
      item.text = element.amApi.apiName;
      item.id = element.amApi.apiId;
      api_datas.push(item);
    });
    this.apiSelections = api_datas;
  }

  /**
   * initialization of a process for apiversion
   * @param apiVersionId the id of the api version
   */
  processInstance(apiVersionId: number) {
    this.apiProcessService.processInstance(apiVersionId).then(
      response => {
        var currentPage = this.apiVersionInfo.number;
        this.choosePageNumber(currentPage);
        let message;
        this.translate.get('Message.ProcessInstanceSuccess').subscribe((res: string) => {
          message = res;
        });
        this.toastr.success('', message, { dismiss: 'controlled' })
          .then((toast: Toast) => {
            setTimeout(() => {
              this.toastr.dismissToast(toast);
            }, 2000);
          });
      }).catch(
        error => {
          let message;
          this.translate.get('Message.ProcessInstanceFail').subscribe((res: string) => {
            message = res;
          });
          this.toastr.error('', message, { dismiss: 'controlled' })
            .then((toast: Toast) => {
              setTimeout(() => {
                this.toastr.dismissToast(toast);
              }, 2000);
            });
        });
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
