import { PolicyForm } from '../policy-form';
import { PolicyService } from '../policy.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { Policy } from '../policy';
import { TranslateService } from '@ngx-translate/core';
import { CommonUtil } from '../../../common/util/common-util';
import { ConditionGroup } from './condition-group/condition-group';
import { ConditionGroupForm } from './condition-group/condition-group-form';

@Component({
  selector: 'app-policy-business',
  templateUrl: './policy-business.component.html',
  styleUrls: ['./policy-business.component.css'],
  providers: [PolicyService]
})

export class PolicyBusinessComponent implements OnInit {
  // the id of policy
  amPolicyId: number;
  // business name
  business: string;
  // the policy
  policy: Policy = new Policy();
  // the business from
  businessForm: FormGroup;
  // check is update business
  isUpdate: boolean = true;

  // a list of quota type
  quotaTypes = CommonUtil.getListQuotaType();

  // a list of policy type
  policyTypes = CommonUtil.getListPolicyType();

  // a list of policy staus
  deployStatuses = CommonUtil.getListStatus();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private policyService: PolicyService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    private translate: TranslateService,
    public vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.bindingData();
  }

  /**
   * binding data when init form
   */
  private bindingData() {
    this.route.params.subscribe(params => {
      // get policy id from url
      this.amPolicyId = params['amPolicyId'];
      // get business from url
      this.business = params['business'];
      if (this.business == 'create') {
        this.bindingCreateForm();
      }
      if (this.business == 'update') {
        this.bindingUpdateForm();
      }
    });
  }

  /**
   * binding data when is create business
   */
  private bindingCreateForm() {
    this.isUpdate = false;
    this.businessForm = PolicyForm.policyCreateForm(this.fb);
  }

  /**
   * binding data when is update business
   */
  private bindingUpdateForm() {
    this.isUpdate = true;
    this.businessForm = PolicyForm.policyUpdateForm(this.fb);
    this.policyService.findOne(this.amPolicyId)
      .then(response => {
        console.log(response.data)
        this.policy = response.data;
        // binding policy data
        PolicyForm.bindingData(this.businessForm, this.policy);
        // binding condition group
        this.binddingConditionGroup();
      })
      .catch(error => console.log('errors: ' + error));
  }

  /**
   * binding data to condition group form
   * @param businessForm the business form
   * @param policy the policy data
   */
  private binddingConditionGroup() {
    // control refers to your formarray
    const control = <FormArray>this.businessForm.controls['amConditionGroups'];
    this.policy.amConditionGroups.forEach(element => {
      // init form data
      let conditionGroupForm: FormGroup = ConditionGroupForm.conditionGroupForm(this.fb);
      // binding data
      ConditionGroupForm.bindingData(conditionGroupForm, element);
      // add form group
      control.push(conditionGroupForm);
    });
  }

  /**
   * add new condition group to policy
   */
  addConditionGroup() {
    // control refers to your formarray
    const control = <FormArray>this.businessForm.controls['amConditionGroups'];
    // add new formgroup
    control.push(ConditionGroupForm.conditionGroupForm(this.fb));
    // add new condition group to policy
    this.policy.amConditionGroups.push(new ConditionGroup());
  }

  /**
   * remove condition group 
   * @param index the index of delete condition group 
   */
  removeConditionGroup(index: number) {
    // control refers to your formarray
    const control = <FormArray>this.businessForm.controls['amConditionGroups'];
    // remove the chosen row
    control.removeAt(index);
    // remove conditiongroup
    this.policy.amConditionGroups.splice(index, 1);
  }

  /**
   * update data when ip condition be changed
   * @param $event the new data
   * @param conditionGroupIndex the index of condition group
   */
  changeIpCondition($event, conditionGroupIndex) {
    this.policy.amConditionGroups[conditionGroupIndex].amIpConditions = $event;
    console.log($event);
  }

  /**
   * update data when header field condition be changed
   * @param $event the new data
   * @param conditionGroupIndex the index of condition group
   */
  changeHeaderFieldCondition($event, conditionGroupIndex) {
    this.policy.amConditionGroups[conditionGroupIndex].amHeaderFieldConditions = $event;
    console.log($event);
  }

  /**
   * update data when Jwt claim condition be changed
   * @param $event the new data
   * @param conditionGroupIndex the index of condition group
   */
  changeJwtClaimCondition($event, conditionGroupIndex) {
    this.policy.amConditionGroups[conditionGroupIndex].amJwtClaimConditions = $event;
    console.log($event);
  }

  /**
   * update data when query param condition be change
   * @param $event the new data
   * @param conditionGroupIndex the index of condition group
   */
  changeQueryParamCondition($event, conditionGroupIndex) {
    this.policy.amConditionGroups[conditionGroupIndex].amQueryParameterConditions = $event;
    console.log($event);
  }

  /**
   * validate data when user submit form
   */
  private validData(): boolean {
    // check name valid
    this.businessForm.get('name').setValue(this.businessForm.get('name').value.trim());
    if (this.businessForm.get('name').invalid) {
      return false;
    }
    // display name valid
    this.businessForm.get('displayName').setValue(this.businessForm.get('displayName').value.trim());
    if (this.businessForm.get('displayName').invalid) {
      return false;
    }
    // quota valid
    if (this.businessForm.get('quota').invalid) {
      return false;
    }
    // unittime valid
    if (this.businessForm.get('unitTime').invalid) {
      return false;
    }
    // check condition group valid
    let conditionGroupValid = true;
    // get form array
    let conditionGroupForm = <FormArray>this.businessForm.controls.amConditionGroups;
    // get list form group of form array
    let listCondtionGroupForm: FormControl[] = <FormControl[]>conditionGroupForm.controls
    // check valid
    listCondtionGroupForm.forEach(element => {
      if (!this.checkConditionGroupValid(element)) {
        conditionGroupValid = false;
      }
    });
    return conditionGroupValid;
  }

  /**
   * check condition group form is valid
   * @param conditionGroupFrom condition group form
   */
  private checkConditionGroupValid(conditionGroupFrom: FormControl): boolean {
    // name valid
    if (conditionGroupFrom.get('name').invalid) {
      return false;
    }
    // quota valid
    if (conditionGroupFrom.get('quota').invalid) {
      return false;
    }
    // unittime valid
    if (conditionGroupFrom.get('unitTime').invalid) {
      return false;
    }
    return true;
  }

  /**
   * submit form data
   * @param data the value of form data
   */
  submit(data: Policy) {
    if (this.validData()) {
      this.mappingData(data);
      if (this.business == 'create')
        this.create();
      else
        this.update();
    }
  }

  /**
   * create a new policy
   */
  private create() {
    this.policyService.create(this.policy)
      .then(response => {
        this.goBack();
      })
      .catch(error => {
        debugger;
        let message;
        this.translate.get('Message.CreateFail').subscribe((res: string) => {
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

  /**
   * update the policy
   */
  private update() {
    this.policyService.update(this.policy)
      .then(response => {
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
            }, 2000);
          });
      });
  }

  /**
   * mapping form data to object data
   * @param formData the form data
   */
  private mappingData(formData: Policy) {
    this.policy.amPolicyId = formData.amPolicyId;
    this.policy.description = formData.description;
    this.policy.displayName = formData.displayName;
    this.policy.isDeployed = formData.isDeployed;
    this.policy.name = formData.name;
    if (this.business == 'create') {
      this.policy.policyType = formData.policyType;
    }
    this.policy.quota = formData.quota;
    this.policy.quotaType = formData.quotaType;
    this.policy.unitTime = formData.unitTime;
    for (let i = 0; i < this.policy.amConditionGroups.length; i++) {
      this.policy.amConditionGroups[i].description = formData.amConditionGroups[i].description;
      this.policy.amConditionGroups[i].quota = formData.amConditionGroups[i].quota;
      this.policy.amConditionGroups[i].quotaType = formData.amConditionGroups[i].quotaType;
      this.policy.amConditionGroups[i].unitTime = formData.amConditionGroups[i].unitTime;
      this.policy.amConditionGroups[i].name = formData.amConditionGroups[i].name;
    }
  }

  /**
   * cancel operation and go back
   */
  goBack() {
    this.location.back();
  }

}

