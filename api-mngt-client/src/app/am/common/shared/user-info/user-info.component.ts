import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { UserInfo } from '../../../../authentication/sso-processing/user-info';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../../util/constants';
import { UserForm } from './user-form.component';
import { UserInfoService } from './user-info.service';
import { Toast } from 'ng2-toastr';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  providers: [ToastsManager, UserInfoService]
})
export class UserInfoComponent implements OnInit {

  userInfo: UserInfo;
  updateInfoForm: FormGroup;
  changePasswordForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private translate: TranslateService,
    private userInfoService: UserInfoService,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) { this.toastr.setRootViewContainerRef(vcr); }

  ngOnInit() {
    debugger;
    this.userInfo = JSON.parse(localStorage.getItem(Constants.CURRENT_USER));
    this.updateInfoForm = UserForm.updateInfo(this.fb);
    this.changePasswordForm = UserForm.changePasswordForm(this.fb);
    UserForm.bindingDataInfo(this.updateInfoForm, this.userInfo);
  }

  updateProfile(userInfo: any) {
    userInfo.displayName = userInfo.surname + " " + userInfo.givenName;
    this.userInfoService.updateInfo(userInfo)
      .then(response => {
        let message;
        this.translate.get('Message.UpdateSuccess').subscribe((res: string) => {
          message = res;
        });
        this.toastr.success('', message, { dismiss: 'controlled' })
          .then((toast: Toast) => {
            setTimeout(() => {
              this.toastr.dismissToast(toast);
            }, 3000);
          });

        // update info in localstorage
        this.userInfo.surname = userInfo.surname;
        this.userInfo.givenName = userInfo.givenName;
        this.userInfo.mobileAlias = userInfo.mobileAlias;
        localStorage.setItem(Constants.CURRENT_USER, JSON.stringify(this.userInfo));
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

  updatePassword(passInfo: any) {
    passInfo.userName = this.userInfo.userName;

    this.userInfoService.changePassword(passInfo)
      .then(response => {
        let message;
        this.translate.get('Message.UpdateSuccess').subscribe((res: string) => {
          message = res;
        });
        this.toastr.success('', message, { dismiss: 'controlled' })
          .then((toast: Toast) => {
            setTimeout(() => {
              this.toastr.dismissToast(toast);
            }, 3000);
          });
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
}
