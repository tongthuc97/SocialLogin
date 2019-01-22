import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ResponseMessageComponent } from '../../../common/util/response-message/response-message.component';

import { ResponseMessage2 } from '../../../common/util/response-message-2/response-message-2';
import { Application } from '../../application/application';
import { ApplicationService } from '../../application/application.service';
import { Policy } from '../../policy/policy';
import { PolicyService } from '../../policy/policy.service';
import { Subscription } from '../subscription';
import { SubscriptionForm } from '../subscription-form.component';
import { SubscriptionService } from '../subscription.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { ActivatedRoute } from '@angular/router';
import { CommonUtil } from '../../../common/util/common-util';
import { ApiVersion } from '../../api/api-detail/api-version/api-version';
import { ApiVersionService } from '../../api/api-detail/api-version/api-version.service';


@Component({
  selector: 'app-subscription-create',
  templateUrl: './subscription-create.component.html',
  styleUrls: ['./subscription-create.component.css'],
  providers: [SubscriptionService, ApplicationService, ApiVersionService, PolicyService]
})

/**
 * @description : Component quản lý việc tạo mới.
 */
export class SubscriptionCreateComponent implements OnInit {

  createForm: FormGroup;
  responseMessage: string;

  policies: Policy[];
  apiVersions: ApiVersion[];

  policySelections: Array<any> = [];
  apiVersionSelections: Array<any> = [];

  applicationId: number;
  application: Application;

  statuses = CommonUtil.getListStatus();

  constructor(
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService,
    private location: Location,
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
    // Khởi tạo form thêm mới.
    this.applicationId = this.route.snapshot.parent.params['applicationId'];
    this.applicationService.findOne(this.applicationId)
      .then(response => {
        this.application = response;        
      });
    this.createForm = SubscriptionForm.getCreateForm(this.fb);
    this.createForm.patchValue({
      amApplication: ({
          applicationId: this.applicationId
      }),
      amPolicy: ({
          amPolicyId: 0,
      }),
      amApiVersion: ({
          apiVersionId: 0,
      }),
      subStatus: '1',
    });

      this.policyService.findByPolicyTypeAndIsDeployed(4,1).then(policyInfo => {
        this.policies = policyInfo;
        // this.initializePolicySelection();
      });
      this.apiVersionService.getListForApplication(this.applicationId).then(apiVersionInfo => {
        this.apiVersions = apiVersionInfo;
        // this.initializeApiVersionSelection();
      });
  }

  create(subscription) {
    this.subscriptionService.create(subscription)
      .then(response => {
        this.goBack();
        this.responseMessage = response;
      })
      .catch(error => {
        this.toastr.error('', 'Create process failed!', { dismiss: 'controlled' })
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
      countItems+=1;
    });
    this.policySelections = policy_datas;
  }

  public refreshPolicyValue(value:any):void {
    this.createForm.get('amPolicy.amPolicyId').setValue(null);
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
      countItems+=1;
    });
    this.apiVersionSelections = apiVersion_datas;
  }

  public refreshApiVersionValue(value:any):void {
    console.log("refreshValue");
    this.createForm.get('amApiVersion.apiVersionId').setValue(null);
  }
}


