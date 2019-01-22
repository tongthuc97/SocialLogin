import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AdmAccessService } from '../adm-access.service';
import { AdmAccessForm } from '../adm-access-form.component';
import { AdmAccess } from '../adm-access';

@Component({
  selector: 'app-adm-access-business',
  templateUrl: './adm-access-business.component.html',
  providers: [AdmAccessService]
})

/**
 * @description: Component quản lý việc chỉnh sửa.
 */
export class AdmAccessBusinessComponent implements OnInit {
  accessId: number;
  business: string;
  admAccessForm: FormGroup;
  admAccess: AdmAccess;

  isUpdate: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private admAccessService: AdmAccessService,
    private fb: FormBuilder,
    private translate: TranslateService,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getDataInput();
  }

  private getDataInput() {
    this.route.params.subscribe(params => {
      // get business from url
      this.business = params['business'];
      // get access id from url
      this.accessId = +params['id'];
      this.bindingData();
    });
  }

  private bindingData() {
    if (this.business == "create") {
      this.admAccessForm = AdmAccessForm.CreateForm(this.fb);
      this.isUpdate = false;
    } else if (this.business == "update") {
      this.admAccessForm = AdmAccessForm.UpdateForm(this.fb);
      this.admAccessService.findOne(this.accessId).then(response => {
        this.admAccess = response;
        AdmAccessForm.bindingData(this.admAccessForm, this.admAccess);
      })
    }
  }

  /**
   * @description : submit data
   * @param admAccess : the infomation of object
   */
  submit(admAccess) {
    if (this.isUpdate) {
      this.updateAdmAccess(admAccess);
    } else {
      this.createAdmAccess(admAccess);
    }
  }

  /**
   * @description create new object
   * @param admAccess the infomation of object
   */
  createAdmAccess(admAccess) {
    this.admAccessService.create(admAccess)
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
   * @param admAccess the infomation of object
   */
  updateAdmAccess(admAccess) {
    this.admAccessService.update(admAccess)
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
    if (this.admAccessForm.get('accessName').invalid) {
      return false;
    }
    // check method is valid
    if (this.admAccessForm.get('accessKey').invalid) {
      return false;
    }
    return true;
  }

  goBack() {
    this.location.back();
  }
}
