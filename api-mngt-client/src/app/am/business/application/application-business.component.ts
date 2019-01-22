import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApplicationForm } from './application-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ResponseMessageComponent } from '../../common/util/response-message/response-message.component';
import { ApplicationService } from './application.service';
import { SubscriberService} from '../subscriber/subscriber.service';
import { PolicyService } from '../policy/policy.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';

import { Subscriber } from '../subscriber/subscriber';
import { Policy } from '../policy/policy';
import { Application } from './application';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-application-business',
  templateUrl: './application-business.component.html',
  providers: [ApplicationService, SubscriberService, PolicyService]
})

/**
 * @description: Component quản lý việc chỉnh sửa.
 */
export class ApplicationBusinessComponent implements OnInit {
  private sub: any;
  applicationId: number;
  business: string;
  applicationForm: FormGroup;
  application: Application;
  // Liên quan tới message trả về từ server.
  responseMessage: string;
  //.
  isUpdate: boolean = true;
    // dữ liệu hiện thị combobox
  listSubscriber: Subscriber[];
  listPolicy: Policy[];

  policySelections: Array<any> = [];
  subscriberSelections: Array<any> = [];

  indexPolicySelection: number;
  indexSubscriberSelection: number;

  checkApplicationExistWithName: boolean = false;

  listStatus = [
        {id: 1, name: 'Enable'},
        {id: 0, name: 'Disable'}
    ];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private applicationService: ApplicationService,
    private subscriberService: SubscriberService,
    private policyService: PolicyService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    private translate: TranslateService,
    public vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // Khởi tạo form sửa
    // Lấy bản ghi theo 'applicationId' từ @PathParam
    this.sub = this.route.params.subscribe(params => {
      this.applicationId = params['applicationId'];
      this.business = params['business'];
      this.applicationForm = ApplicationForm.applicationForm(this.fb, this.business);
      if (this.business == 'create') {
        this.isUpdate = false;
        this.applicationForm = ApplicationForm.applicationForm(this.fb, this.business);
        this.applicationForm.patchValue({
            applicationStatus: '1',
        });
        this.getListPolicy();
        this.getListSubscriber();
      }
      if (this.business == 'update') {
        this.isUpdate = true;
        this.applicationService.findOne(this.applicationId)
        .then(response => {
          this.application = response;
          ApplicationForm.bindingData(this.applicationForm, this.application);
          this.getListPolicy();
          this.getListSubscriber();
        })
        .catch(error => console.log("errors: " + error));
        }
    });
  }

  getListSubscriber() {
    this.subscriberService.getListSubscriber()
      .then(subscribers =>{
        this.listSubscriber = subscribers;
        this.initializeSubscriberSelection();
      })
      .catch(error=>{
          console.log(error);
      })
  }

  getListPolicy() {
    this.policyService.findByPolicyTypeAndIsDeployed(3,1)
      .then(policys =>{
        this.listPolicy = policys;
        this.initializePolicySelection();
      })
      .catch(error=>{
           console.log(error);
      })
  }

  submit(application) {
    if (application.applicationId == "") {
      this.applicationService.createApplication(application.amSubscriber.subscriberId, application.amPolicy.amPolicyId, application)
        .then(response => {
          this.responseMessage = response;
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
        });
    } else {
      this.applicationService.updateApplication(application.amSubscriber.subscriberId, application.amPolicy.amPolicyId, application)
        .then(response => {
          this.responseMessage = response;
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
        });
    }

  }

  applicationExistWithName(name: string){
    this.applicationService.findByName(name)
        .then(response => {
          this.checkApplicationExistWithName = true;
        })
        .catch(error => {
          this.checkApplicationExistWithName = false;
        });
  }
  
  goBack() {
    this.location.back();
  }

  initializePolicySelection() {
    let policy_datas = [];
    var countItems = 0;
    this.listPolicy.forEach(element => {
      let item = {
        id: null, text: null
      };
      item.text = element.displayName;
      item.id = element.amPolicyId;
      policy_datas.push(item);
      if(this.application!=undefined&&this.application!=null&&item.id == this.application.amPolicy.amPolicyId){
        this.indexPolicySelection = countItems;
      }
      countItems+=1;
    });
    this.policySelections = policy_datas;
  }

  public refreshPolicyValue(value:any):void {
    this.indexPolicySelection = null;
    this.applicationForm.get('amPolicy.amPolicyId').setValue(null);
  }

  initializeSubscriberSelection() {
    let subscriber_datas = [];
    var countItems = 0;
    this.listSubscriber.forEach(element => {
      let item = {
        id: null, text: null
      };
      item.text = element.name;
      item.id = element.subscriberId;
      subscriber_datas.push(item);
      if(this.application!=undefined&&this.application!=null&&item.id == this.application.amSubscriber.subscriberId){
        this.indexSubscriberSelection = countItems;
      }
      countItems+=1;
    });
    this.subscriberSelections = subscriber_datas;
  }

  public refreshSubscriberValue(value:any):void {
    this.indexSubscriberSelection = null;
    this.applicationForm.get('amSubscriber.subscriberId').setValue(null);
  }
}
