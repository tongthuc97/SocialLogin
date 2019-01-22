import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConditionGroupForm } from './condition-group-form';

import { ConditionGroupService } from './condition-group.service';
import { ConditionGroup } from './condition-group';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from '../../../../common/dialog/dialog.service';
import { AuthGuardSubmenu } from '../../../../../authentication/guard/auth.guard-submenu';
import { PolicyService } from '../../policy.service';
import { CommonUtil } from '../../../../common/util/common-util';

@Component({
  selector: 'app-condition-group',
  templateUrl: './condition-group.component.html',
  styleUrls: ['./condition-group.component.css'],
  providers: [ConditionGroupService]
})

/**
 * @description: Coordinator quản lý bảng 'ConditionGroup'
 */
export class ConditionGroupComponent implements OnInit {

  @Input() conditionGroupForm: FormBuilder;

  quotaTypes = CommonUtil.getListQuotaType();

  policyTypes = CommonUtil.getListPolicyType();

  constructor(
    private conditionGroupService: ConditionGroupService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    private policyService: PolicyService,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private authGuardSubmenu: AuthGuardSubmenu,
    private translate: TranslateService,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {

  }

  // To Authorize User
  isAuthoriziedNavigation(): boolean {
    var isAuthorizied = this.authGuardSubmenu.isAuthoriziedWithCurrentUrl(this.router.url);
    return isAuthorizied;
  }
}
