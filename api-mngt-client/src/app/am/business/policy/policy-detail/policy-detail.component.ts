import { PolicyService } from '../policy.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import { Policy } from '../policy';
import { CommonUtil } from '../../../common/util/common-util';
import { ConditionGroup } from '../policy-business/condition-group/condition-group';


@Component({
  selector: 'app-policy-detail',
  templateUrl: './policy-detail.component.html',
  styleUrls: ['./policy-detail.component.css'],
  providers: [PolicyService]
})
export class PolicyDetailComponent implements OnInit {

  amPolicyId: any;

  policy: Policy;

  conditionGroups: ConditionGroup[];

  // a list of quota type
  quotaTypes = CommonUtil.getListQuotaType();

  // a list of policy type
  policyTypes = CommonUtil.getListPolicyType();

  // a list of policy staus
  deployStatuses = CommonUtil.getListStatus();

  listDirectional = CommonUtil.getListDirectional();

  listStatus = CommonUtil.getListStatus();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private policyService: PolicyService

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // get policy id from url
      this.amPolicyId = params['amPolicyId'];
      this.bindingData();
    });
  }

  private bindingData() {
    this.policyService.findOne(this.amPolicyId)
      .then(response => {
        console.log(response.data)
        this.policy = response.data;
        this.conditionGroups = this.policy.amConditionGroups;
      })
      .catch(error => console.log('errors: ' + error));
  }

  getQuotaTypeById(id: number) {
    return CommonUtil.getQuotaTypeById(id);
  }

  getPolicyTypeById(id: number) {
    return CommonUtil.getPolicyTypeById(id);
  }

  /**
   * get status string by status id
   * @param id the id of the status
   */
  getStatusById(id: number) {
    return CommonUtil.getStatusById(id);
  }

  /**
   * get directional string by directional id
   * @param id the id of the directional
   */
  getDirectionalById(id: number) {
    return CommonUtil.getDirectionalById(id);
  }

  goBack() {
    this.location.back();
  }

}

