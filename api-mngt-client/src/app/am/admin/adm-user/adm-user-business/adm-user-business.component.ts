import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AdmUserService } from '../adm-user.service';
import { AdmUserForm } from '../adm-user-form.component';
import { AdmUser, AdmUserRes, AdmUserReq } from '../adm-user';
import { AdmRoleRes } from '../../adm-role/adm-role';
import { AdmRoleService } from '../../adm-role/adm-role.service';

@Component({
  selector: 'app-adm-user-business',
  templateUrl: './adm-user-business.component.html',
  providers: [AdmUserService, AdmRoleService]
})

/**
 * @description: Component quản lý việc chỉnh sửa.
 */
export class AdmUserBusinessComponent implements OnInit {
  userId: number;
  business: string;
  admUserForm: FormGroup;
  admUserRes: AdmUserRes = new AdmUserRes();

  admUserReq: AdmUserReq = new AdmUserReq();

  listRole: AdmRoleRes[] = [];

  isUpdate: boolean = true;

  userTypeAdmin = "Admin";
  userTypeMember = "Member";

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private admUserService: AdmUserService,
    private admRoleService: AdmRoleService,
    private fb: FormBuilder,
    private translate: TranslateService,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getDataInput();
    this.getListRole();
  }

  private getDataInput() {
    this.route.params.subscribe(params => {
      // get business from url
      this.business = params['business'];
      // get user id from url
      this.userId = +params['id'];
      this.bindingData();
      console.log(this.admUserForm);
      debugger;
    });
  }

  private getListRole() {
    this.admRoleService.getListAdmRole()
      .then(response => {
        this.listRole = JSON.parse(JSON.stringify(response.data));
        this.checkRoleForUser(this.listRole, this.admUserRes);
      });
  }
  private checkRoleForUser(listRole: AdmRoleRes[], admUser: AdmUserRes) {
    listRole.forEach(role => {
      admUser.admUserRoles.forEach(userRole => {
        if (role.roleId == userRole.admRole.roleId) {
          role.checked = true;
        }
      });
    });
  }


  private bindingData() {
    if (this.business == "create") {
      this.admUserForm = AdmUserForm.CreateForm(this.fb);
      this.isUpdate = false;
    } else if (this.business == "update") {
      this.admUserForm = AdmUserForm.UpdateForm(this.fb);
      this.admUserService.findOne(this.userId).then(response => {
        this.admUserRes = response;
        AdmUserForm.bindingData(this.admUserForm, this.admUserRes);
        this.checkRoleForUser(this.listRole, this.admUserRes);
      })
    }
  }

  /**
   * @description : submit data
   * @param admUser : the infomation of object
   */
  submit(admUser) {
    this.formDataToObject(admUser);
    let listRoleIds: number[] = [];
    this.listRole.forEach(role => {
      if (role.checked) {
        listRoleIds.push(role.roleId);
      }
    });

    this.admUserReq.roleIds = listRoleIds;
    console.log(admUser);
    if (this.isUpdate) {
      this.updateAdmUser(this.admUserReq);
    } else {
      this.createAdmUser(this.admUserReq);
    }
  }

  private formDataToObject(admUserData: any) {
    this.admUserReq.userId = admUserData.userId;
    this.admUserReq.loweredUsername = admUserData.loweredUsername;
    this.admUserReq.surname = admUserData.surname;
    this.admUserReq.givenName = admUserData.givenName;
    this.admUserReq.displayName = admUserData.surname + " " + admUserData.givenName;
    this.admUserReq.userName = admUserData.userName;
    this.admUserReq.mobileAlias = admUserData.mobileAlias;
    if (admUserData.isAnonymous) {
      this.admUserReq.isAnonymous = 1;
    } else {
      this.admUserReq.isAnonymous = 0;
    }
    this.admUserReq.lastActivityDate = admUserData.lastActivityDate;
    if (admUserData.userType == "Admin") {
      this.admUserReq.userType = 1;
    } else if (admUserData.userType == "Member") {
      this.admUserReq.userType = 2;
    } else {
      this.admUserReq.userType = 2;
    }
    this.admUserReq.applicationId = admUserData.applicationId;
  }

  /**
   * @description create new object
   * @param admUser the infomation of object
   */
  createAdmUser(admUser) {
    this.admUserService.create(admUser)
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
   * @param admUser the infomation of object
   */
  updateAdmUser(admUser) {
    this.admUserService.update(admUser)
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
    if (this.admUserForm.get('userName').invalid) {
      return false;
    }
    // check method is valid
    if (this.admUserForm.get('loweredUsername').invalid) {
      return false;
    }
    return true;
  }

  goBack() {
    this.location.back();
  }
}
