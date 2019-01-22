import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AdmRoleService } from '../adm-role.service';
import { AdmRoleForm } from '../adm-role-form.component';
import { AdmRoleRes, AdmRoleReq } from '../adm-role';
import { AdmRight } from '../../adm-right/adm-right';
import { AdmRightService } from '../../adm-right/adm-right.service';

@Component({
  selector: 'app-adm-role-business',
  templateUrl: './adm-role-business.component.html',
  providers: [AdmRoleService, AdmRightService]
})

/**
 * @description: Component quản lý việc chỉnh sửa.
 */
export class AdmRoleBusinessComponent implements OnInit {
  roleId: number;
  business: string;
  admRoleForm: FormGroup;

  admRoleRes: AdmRoleRes = new AdmRoleRes();

  admRoleReq: AdmRoleReq = new AdmRoleReq();

  listRight: AdmRight[] = [];

  isUpdate: boolean = true;

  isChooseAccess: boolean = false;

  Enable = "Enable";
  Disable = "Disable";

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private admRoleService: AdmRoleService,
    private admRightService: AdmRightService,
    private fb: FormBuilder,
    private translate: TranslateService,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getDataInput();
    this.getListAdmRight();
  }

  private getDataInput() {
    this.route.params.subscribe(params => {
      // get business from url
      this.business = params['business'];
      // get role id from url
      this.roleId = +params['id'];
      this.bindingData();
    });
  }

  private getListAdmRight() {
    this.admRightService.getListAdmRight()
      .then(response => {
        this.listRight = JSON.parse(JSON.stringify(response.data));
        this.checkRightForRole(this.listRight, this.admRoleRes);
        console.log(this.listRight);
      });
  }

  private bindingData() {
    if (this.business == "create") {
      this.admRoleForm = AdmRoleForm.CreateForm(this.fb);
      this.isUpdate = false;
    } else if (this.business == "update") {
      this.admRoleForm = AdmRoleForm.UpdateForm(this.fb);
      this.admRoleService.findOne(this.roleId).then(response => {
        this.admRoleRes = response;
        AdmRoleForm.bindingData(this.admRoleForm, this.admRoleRes);
        this.checkRightForRole(this.listRight, this.admRoleRes);
      })
    }
  }

  private checkRightForRole(listRight: AdmRight[], admRole: AdmRoleRes) {
    listRight.forEach(right => {
      admRole.admRoleRights.forEach(roleRight => {
        if (right.rightId == roleRight.admRight.rightId) {
          right.checked = true;
          right.admAccessRights.forEach(accessRight => {
            admRole.admAccessRightRoles.forEach(accessRightRole => {
              debugger;
              if (accessRight.id == accessRightRole.admAccessRight.id) {
                accessRight.checked = true;
              }
            });
          });
        }
      });
    });
  }

  /**
   * @description : submit data
   * @param admRole : the infomation of object
   */
  submit(admRole) {
    console.log(admRole);
    debugger;
    // get form data
    this.formDataToObject(admRole);
    // get list api for role
    let roleRightIds: number[] = [];
    // get list api for role
    let admAccessRightIds: number[] = [];
    this.listRight.forEach(right => {
      if (right.checked) {
        roleRightIds.push(right.rightId);
        right.admAccessRights.forEach(accessRight => {
          if (accessRight.checked) {
            admAccessRightIds.push(accessRight.id);
          }
        });
      }
    })
    this.admRoleReq.admRightIds = roleRightIds;
    this.admRoleReq.admAccessRightIds = admAccessRightIds;
    if (this.isUpdate) {
      this.updateAdmRole(this.admRoleReq);
    } else {
      this.createAdmRole(this.admRoleReq);
    }
  }

  private formDataToObject(admRoleData: any) {
    this.admRoleReq.roleId = admRoleData.roleId;
    this.admRoleReq.roleCode = admRoleData.roleCode;
    this.admRoleReq.roleName = admRoleData.roleName;
    this.admRoleReq.loweredRoleName = admRoleData.loweredRoleName;
    if(admRoleData.status == "Enable"){
      this.admRoleReq.status = 1;
    }else if(admRoleData.status == "Disable"){
      this.admRoleReq.status = 0;
    }else {
      this.admRoleReq.status = 0;
    }
    this.admRoleReq.description = admRoleData.description;
    if(admRoleData.enableDelete == "Enable"){
      this.admRoleReq.enableDelete = 1;
    }else if(admRoleData.enableDelete == "Disable"){
      this.admRoleReq.enableDelete = 0;
    }else {
      this.admRoleReq.enableDelete = 0;
    }
    this.admRoleReq.applicationId = admRoleData.applicationId
  }

  /**
   * @description create new object
   * @param admRole the infomation of object
   */
  createAdmRole(admRole) {
    this.admRoleService.create(admRole)
      .then(response => {
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
      });
  }

  /**
   * @description update object
   * @param admRole the infomation of object
   */
  updateAdmRole(admRole) {
    this.admRoleService.update(admRole)
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
            }, 3000);
          });
      });
  }

  /**
   * @description check data is valid
   */
  isValidForm() {
    // check name is valid
    if (this.admRoleForm.get('roleName').invalid) {
      return false;
    }
    // check method is valid
    if (this.admRoleForm.get('roleCode').invalid) {
      return false;
    }
    return true;
  }

  goBack() {
    this.location.back();
  }
}
