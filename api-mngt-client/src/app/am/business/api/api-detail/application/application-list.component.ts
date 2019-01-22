import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SubscriptionService } from '../../../subscription/subscription.service';
import { ApplicationService } from '../../../application/application.service';
import { ApiVersionService } from '../api-version/api-version.service';
import { SubscriptionInfo } from '../../../subscription/subscription-info';
import { Subscription } from '../../../subscription/subscription';
import { ResponseMessage2 } from '../../../../common/util/response-message-2/response-message-2';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Policy } from '../../../policy/policy';
import { Application } from '../../../application/application';
import { ApiVersion } from '../api-version/api-version';
import { DialogService } from '../../../../common/dialog/dialog.service';
import { SubscriptionForm } from '../../../subscription/subscription-form.component';
import { Location } from '@angular/common';
import { PolicyService } from '../../../policy/policy.service';
import { AuthGuardSubmenu } from '../../../../../authentication/guard/auth.guard-submenu';
import { TranslateService } from '@ngx-translate/core';
import { CommonUtil } from '../../../../common/util/common-util';


@Component({
  selector: 'app-application',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css'],
  providers: [SubscriptionService, PolicyService, ApplicationService, ApiVersionService]
})
export class ApplicationChildList implements OnInit {

  // >Quáº£n lÃ½ page tráº£ vá»� tá»« server
  subscriptionInfo: SubscriptionInfo;
  subscriptions: Subscription[];
  currentPageView: number;
  fromNumber: number;
  toNumber: number;
  // .
  // >LiÃªn quan tá»›i message tráº£ vá»� tá»« server.
  responseMessage: ResponseMessage2;
  isHideErrorDeleting: boolean;
  // .
  // >filter search.
  filterForm: FormGroup;
  switchGetApplication = false;
  filterObject = new Subscription();
  // .
  // >checker.
  checkAllItemFlag = false;

  policies: Policy[];
  applications: Application[];

  policySelections: Array<any> = [];
  applicationSelections: Array<any> = [];

  indexPolicySelection: number;
  indexApplicationSelection: number;

  application: Application;
  apiVersionId: number;
  apiVersion: ApiVersion;
  numberDeleteItems = 0;


  statuses = CommonUtil.getListStatus();

  constructor(
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService,
    private policyService: PolicyService,
    private applicationService: ApplicationService,
    private apiVersionService: ApiVersionService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    private router: Router,
    private authGuardSubmenu: AuthGuardSubmenu,
    private translate: TranslateService,
    public location: Location
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.apiVersionId = +this.route.snapshot.parent.params['apiVersionId'];
    this.apiVersionService.findOne(this.apiVersionId)
      .then(response => {
        this.filterObject.amApiVersion = response;
        this.search(this.filterObject, 0);
        // this.search(this.filterObject,this.subscriptionInfo.number);
      })
    // Initialize forms.
    this.filterForm = SubscriptionForm.getUpdateForm(this.fb);
    this.filterForm.patchValue({
      amApplication: ({
        applicationId: 0,
        name: '',
        description: ''
      }),
      amApiVersion: ({
        apiVersionId: this.apiVersionId,
      }),
      amPolicy: ({
        amPolicyId: 0,
      }),
      subStatus: ''
    });
    // Initialize responseMessage.
    this.responseMessage = new ResponseMessage2();
    this.isHideErrorDeleting = false;
    // Get datas.
    // this.findAll(0);
    this.policyService.findByPolicyTypeAndIsDeployed(4, 1).then(policyInfo => {
      debugger;
      this.policies = policyInfo;
      // this.initializePolicySelection();
    });
    this.applicationService.getListApplication().then(applicationInfo => {
      this.applications = applicationInfo;
      // this.initializeApplicationSelection();
    });
  }

  /**
   * @description: Setting attribute Ä‘á»ƒ hiá»ƒn thá»‹ phÃ¢n trang.
   */
  private setCurrentPage() {
    if (this.subscriptionInfo.numberOfElements > 0) {
      this.currentPageView = this.subscriptionInfo.number + 1;
    } else {
      this.currentPageView = 0;
    }
    const numberOfElements = this.subscriptionInfo.numberOfElements;
    const size = this.subscriptionInfo.size;
    this.fromNumber = (this.currentPageView - 1) * size + 1;
    this.toNumber = (this.currentPageView - 1) * size + numberOfElements;
    if (this.toNumber < 1) {
      this.fromNumber = 0;
      this.toNumber = 0;
    }
  }

  /**
   * @description: HÃ m gá»�i tá»« dá»¯ liá»‡u báº£ng 'queryParameter' theo sá»‘ trang
   * @param currentPage: sá»‘ trang muá»‘n láº¥y
   */
  findAll(currentPage: number) {
    this.subscriptionService.findAll(currentPage).then(
      subscriptionInfo => {
        this.subscriptionInfo = subscriptionInfo;
        this.subscriptions = this.subscriptionInfo.content;
        this.setCurrentPage();
      }).catch(
      error => {
        console.log(error);
      }
      );
  }

  /**
   * @description: HÃ m tÃ¬m kiáº¿m
   * @param queryParameter: ThÃ´ng tin tÃ¬m kiáº¿m
   * @param page: sá»‘ trang muá»‘n láº¥y
   */
  search(subscription: Subscription, page: number) {
    this.filterObject = subscription;
    this.switchGetApplication = true;
    this.subscriptionService.filterSearch(subscription, page)
      .then(subscriptionInfo => {
        this.subscriptionInfo = subscriptionInfo;
        this.subscriptions = this.subscriptionInfo.content;
        this.setCurrentPage();
        this.countNumberDeleteItems();
      });
  }

  /**
   * @description: Coordinator quáº£n lÃ½ viá»‡c chuyá»ƒn trang
   * @param page: sá»‘ trang
   */
  choosePageNumber(page: number) {
    var currentPage = this.subscriptionInfo.number;
    var flag = false;
    var currentPage = this.subscriptionInfo.number;
    if (currentPage > page) {
      if (this.subscriptionInfo.first == false) {
        flag = true;
      }
    } else if (currentPage < page) {
      if (this.subscriptionInfo.last == false) {
        flag = true;
      }
    } else {
      flag = true;
    }
    if (flag == true) {
      if (this.switchGetApplication == false) {
        this.findAll(page);
      } else {
        this.search(this.filterObject, page);
      }
    }
  }

  /**
   * @description: DÃ¹ng Ä‘á»ƒ xÃ³a 1 báº£n ghi
   * @param subscriptionId
   */
  delete(item: Subscription) {
    item.checked = true;
    this.dialogService
      .confirm('Confirm Information', 'Are you sure to delete?')
      .subscribe(response => {
        if (response == true) {
          var currentPage = this.subscriptionInfo.number;
          this.responseMessage.setTitle('Delete');
          this.subscriptionService.delete(item.subscriptionId)
            .then(response => {
              this.responseMessage.response = response;
              this.isHideErrorDeleting = true;
              this.choosePageNumber(currentPage);
              let message;
              this.translate.get('Message.DeleteSuccess').subscribe((res: string) => {
                message = res;
              });
              this.toastr.success('', message, { dimiss: 'controlled' })
                .then((toast: Toast) => {
                  setTimeout(() => {
                    this.toastr.dismissToast(toast);
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
              this.responseMessage.response = error;
              this.isHideErrorDeleting = true;
            });
        } else {
          item.checked = false;
        }
      })
  }

  /**
   * @description: Check táº¥t cáº£ items khi click Ã´ checkbox all.
   */
  checkAllItem() {
    this.checkAllItemFlag = !this.checkAllItemFlag;
    this.subscriptions.forEach(item => {
      item.checked = this.checkAllItemFlag;
    });
  }

  /**
   * @description: XÃ³a cÃ¡c items Ä‘Æ°á»£c chá»�n.
   */
  deleteCheckedItems() {
    var entityIds = [];
    this.subscriptions.forEach(item => {
      if (item.checked == true) {
        entityIds.push(item.subscriptionId);
      }
    });
    if (entityIds.length > 0) {
      this.dialogService.confirm('Confirm Information', 'Are you sure to delete?')
        .subscribe(response => {
          if (response == true) {
            var currentPage = this.subscriptionInfo.number;
            this.responseMessage.setTitle("Delete All");
            this.subscriptionService.deleteAllBatch(entityIds)
              .then(response => {
                this.responseMessage.response = response;
                this.isHideErrorDeleting = true;
                this.checkAllItemFlag = false;
                this.choosePageNumber(currentPage);
                this.numberDeleteItems = 0;
                let message;
                this.translate.get('Message.DeleteSuccess').subscribe((res: string) => {
                  message = res;
                });
                this.toastr.success('', message, { dismiss: 'controlled' })
                  .then((toast: Toast) => {
                    setTimeout(() => {
                      this.toastr.dismissToast(toast);
                    }, 2000);
                  });
              })
              .catch(error => {
                this.numberDeleteItems = 0;
                this.checkAllItemFlag = false;
                this.responseMessage.response = error;
                this.isHideErrorDeleting = true;
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
              });
          }
        });
    }
  }

  countNumberDeleteItems() {
    this.numberDeleteItems = 0;
    this.subscriptions.forEach(item => {
      if (item.checked == true) {
        this.numberDeleteItems += 1;
      }
    });
  }

  getNumberDeleteItems(): number {
    return this.numberDeleteItems;
  }

  initializePolicySelection() {
    let policy_datas = [];
    var countItems = 0;
    this.policies.forEach(element => {
      let item = {
        id: null, text: null
      };
      item.text = element.displayName;
      item.id = element.amPolicyId;
      policy_datas.push(item);
      countItems += 1;
    });
    this.policySelections = policy_datas;
  }

  public refreshPolicyValue(value: any): void {
    this.indexPolicySelection = null;
    this.filterForm.get('amPolicy.amPolicyId').setValue(0);
  }

  initializeApplicationSelection() {
    let application_datas = [];
    var countItems = 0;
    this.applications.forEach(element => {
      let item = {
        id: null, text: null
      };
      item.text = element.name;
      item.id = element.applicationId;
      application_datas.push(item);
      countItems += 1;
    });
    this.applicationSelections = application_datas;
  }

  public refreshApplicationValue(value: any): void {
    this.indexApplicationSelection = null;
    this.filterForm.get('amApplication.applicationId').setValue(0);
  }

  // To Authorize User
  isAuthoriziedNavigation(): boolean {
    var isAuthorizied = this.authGuardSubmenu.isAuthoriziedWithCurrentUrl(this.router.url);
    return isAuthorizied;
  }

  getStatusById(id: number): string {
    return CommonUtil.getStatusById(id);
  }
}


