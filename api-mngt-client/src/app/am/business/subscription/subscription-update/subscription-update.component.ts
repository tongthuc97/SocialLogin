import { ResponseMessage2 } from '../../../common/util/response-message-2/response-message-2';
import { Application } from '../../application/application';
import { Policy } from '../../policy/policy';
import { PolicyService } from '../../policy/policy.service';
import { SubscriptionForm } from '../subscription-form.component';
import { SubscriptionService } from '../subscription.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { Subscription } from '../subscription';
import { CommonUtil } from '../../../common/util/common-util';
import { ApplicationService } from '../../application/application.service';
import { ApiVersionService } from '../../api/api-detail/api-version/api-version.service';
import { ApiVersion } from '../../api/api-detail/api-version/api-version';

@Component({
  selector: 'app-subscription-update',
  templateUrl: './subscription-update.component.html',
  styleUrls: ['./subscription-update.component.css'],
  providers: [SubscriptionService, ApplicationService, ApiVersionService, PolicyService]
})
export class SubscriptionUpdateComponent implements OnInit {
  subscriptionId: number;

  subscription: Subscription;
  updateForm: FormGroup;

  responseMessage: string;

  policies: Policy[];
  apiVersions: ApiVersion[];

  policySelections: Array<any> = [];
  apiVersionSelections: Array<any> = [];

  indexPolicySelection: number;
  indexApiVersionSelection: number;

  applicationId: number;
  application: Application;

  statuses = CommonUtil.getListStatus();
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private subscriptionService: SubscriptionService,
    private fb: FormBuilder,
    private policyService: PolicyService,
    private apiVersionService: ApiVersionService,
    private applicationService: ApplicationService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.applicationId = this.route.snapshot.parent.params['applicationId'];
    this.updateForm = SubscriptionForm.getUpdateForm(this.fb);
    this.route.paramMap
      .switchMap((params: ParamMap) => params.getAll('subscriptionId')).subscribe(subscriptionId => {
        this.subscriptionId = +subscriptionId;
        this.subscriptionService.findOne(this.subscriptionId)
          .then(response => {
            this.subscription = response;
            SubscriptionForm.bindingData(this.updateForm, this.subscription);
            this.getlistApiVersion();
            this.getlistPolicy();
          })
          .catch(error => console.log('errors: ' + error));
      });
  }

  getlistPolicy() {
    this.policyService.findByPolicyTypeAndIsDeployed(4, 1).then(policyInfo => {
      this.policies = policyInfo;
      // this.initializePolicySelection();
    });
  }

  getlistApiVersion() {
    this.apiVersionService.getListForApplication(this.applicationId).then(apiVersionInfo => {
      this.apiVersions = apiVersionInfo;
      if (this.subscription != undefined) {
        this.apiVersions.push(this.subscription.amApiVersion);
      }
      // this.initializeApiVersionSelection();
    });
  }

  update(subscription) {
    this.subscriptionService.update(subscription)
      .then(response => {
        this.goBack();
        this.responseMessage = response;
      })
      .catch(error => {
        this.toastr.error('', 'Update process failed!', { dismiss: 'controlled' })
          .then((toast: Toast) => {
            setTimeout(() => {
              this.toastr.dismissToast(toast);
            }, 2000);
          });
        this.responseMessage = error;
      });
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
    this.updateForm.get('amPolicy.amPolicyId').setValue(null);
  }

  initializeApiVersionSelection() {
    let apiVersion_datas = [];
    var countItems = 0;
    this.apiVersions.forEach(element => {
      let item = {
        id: null, text: null
      };
      item.text = element.amApi.apiName;
      item.id = element.apiVersionId;
      apiVersion_datas.push(item);
      if (this.subscription != undefined && this.subscription != null && item.id == this.subscription.amApiVersion.apiVersionId) {
        this.indexApiVersionSelection = countItems;
      }
      countItems += 1;
    });
    this.apiVersionSelections = apiVersion_datas;
  }

  public refreshApiVersionValue(value: any): void {
    this.updateForm.get('amApiVersion.apiVersionId').setValue(null);
  }
}

