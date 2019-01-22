import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location, CommonModule } from '@angular/common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SubscriptionService } from '../../../../subscription/subscription.service';
import { ApplicationService } from '../../../../application/application.service';
import { ApiVersionService } from '../../api-version/api-version.service';
import { PolicyService } from '../../../../policy/policy.service';
import { ResponseMessage2 } from '../../../../../common/util/response-message-2/response-message-2';
import { Application } from '../../../../application/application';
import { Policy } from '../../../../policy/policy';
import { ApiVersion } from '../../api-version/api-version';
import { SubscriptionForm } from '../../../../subscription/subscription-form.component';
import { Subscription } from '../../../../subscription/subscription';
import { SubscriberForm } from '../../../../subscriber/subscriber-form.component';
import { TranslateService } from '@ngx-translate/core';
import { CommonUtil } from '../../../../../common/util/common-util';


@Component({
  selector: 'app-application-business',
  templateUrl: './application-business.component.html',
  providers: [SubscriptionService, ApplicationService, ApiVersionService, PolicyService]
})

/**
 * @description : Component quản lý việc tạo mới.
 */
export class ApplicationChildBusiness implements OnInit {

  private sub: any;
  // subscription info
  subscriptionId: number;
  subscription: Subscription;

  // business
  business: string;
  businessName: string;

  subscriptionForm: FormGroup;
  // LiÃªn quan tá»›i message tráº£ vá»� tá»« server.

  // response info
  responseMessage: string;
  httpStatus: number;

  applications: Application[];
  policies: Policy[];

  policySelections: Array<any> = [];
  applicationSelections: Array<any> = [];

  indexPolicySelection: number;
  indexApplicationSelection: number;

  apiVersion: ApiVersion;
  apiVersionId: number;

  statuses = CommonUtil.getListStatus()

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private subscriptionService: SubscriptionService,
    private fb: FormBuilder,
    private policyService: PolicyService,
    private apiVersionService: ApiVersionService,
    private applicationService: ApplicationService,
    public toastr: ToastsManager,
    private translate: TranslateService,
    public vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getApiIdParam();
    this.sub = this.route.params.subscribe(params => {
      this.subscriptionId = params['subscriptionId'];
      this.business = params['business'];
      this.subscriptionForm = SubscriptionForm.getCreateForm(this.fb);
      if (this.business == 'create') {
        this.businessName = "Add application";
        this.subscriptionForm.patchValue({
          amApiVersion: ({
            apiVersionId: this.apiVersionId,
          }),
          amPolicy: ({
            amPolicyId: 0,
          }),
          amApplication: ({
            applicationId: 0,
          }),
          subStatus: '1',
        });
        this.getListApplication();
        this.getListPolicy();
      }
      if (this.business == 'update') {
        this.businessName = "Update Application";
        this.subscriptionService.findOne(this.subscriptionId)
          .then(response => {
            this.subscription = response;
            SubscriptionForm.bindingData(this.subscriptionForm, this.subscription);
            this.getListApplication();
            this.getListPolicy();
            this.subscriptionForm.controls['amApplication'].disable();
          })
          .catch(error => console.log("errors: " + error));
      }
    });
  }

  getListPolicy() {
    this.policyService.findByPolicyTypeAndIsDeployed(4, 1).then(policyInfo => {
      this.policies = policyInfo;
    });
  }

  getListApplication() {
    this.applicationService.getListForApiVersion(this.apiVersionId).then(applicationInfo => {
      this.applications = applicationInfo;
      if (this.subscription != undefined) {
        this.applications.push(this.subscription.amApplication);
      }
    });
  }

  getApiIdParam() {
    this.apiVersionId = +this.route.snapshot.parent.params['apiVersionId'];
    this.apiVersionService.findOne(this.apiVersionId)
      .then(apiVersion => {
        this.apiVersion = apiVersion;
      });
  }
  submit(subscription) {
    if (subscription.subscriptionId == "") {
      this.subscriptionService.create(subscription)
        .then(response => {
          this.responseMessage = response;
          this.httpStatus = response;
          this.goBack();
        })
        .catch(error => {
          let message;
          this.translate.get('Message.CreateFail').subscribe((res: string) => {
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
    } else {
      subscription.amApplication = this.subscription.amApplication;
      this.subscriptionService.update(subscription)
        .then(response => {
          this.responseMessage = response;
          this.httpStatus = response;
          this.goBack();
        })
        .catch(error => {
          let message;
          this.translate.get('Message.UpdateFail').subscribe((res: string) => {
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
  }

  goBack() {
    this.location.back();
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
      if (this.subscription != undefined && this.subscription != null && item.id == this.subscription.amPolicy.amPolicyId) {
        this.indexPolicySelection = countItems;
      }
      countItems += 1;
    });
    this.policySelections = policy_datas;
  }

  public refreshPolicyValue(value: any): void {
    this.indexPolicySelection = null;
    this.subscriptionForm.get('amPolicy.amPolicyId').setValue(null);
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
      if (this.subscription != undefined && this.subscription != null && item.id == this.subscription.amApplication.applicationId) {
        this.indexApplicationSelection = countItems;
      }
      countItems += 1;
    });
    this.applicationSelections = application_datas;
  }

  public refreshApplicationValue(value: any): void {
    this.indexApplicationSelection = null;
    this.subscriptionForm.get('amApplication.applicationId').setValue(null);
  }
}
