import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AdmApiService } from '../adm-api.service';
import { AdmApiForm } from '../adm-api-form.component';
import { AdmApi } from '../adm-api';
import { CommonUtil } from '../../../common/util/common-util';


@Component({
  selector: 'app-adm-api-business',
  templateUrl: './adm-api-business.component.html',
  providers: [AdmApiService]
})

/**
 * @description: Component quản lý việc chỉnh sửa.
 */
export class AdmApiBusinessComponent implements OnInit {
  apiId: number;
  business: string;
  admApiForm: FormGroup;
  admApi: AdmApi;

  isUpdate: boolean = true;

  listApiMethod = CommonUtil.getListApiMethod();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private admApiService: AdmApiService,
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
      // get api id from url
      this.apiId = +params['id'];
      this.bindingData();
    });
  }

  private bindingData() {
    if (this.business == "create") {
      this.admApiForm = AdmApiForm.CreateForm(this.fb);
      this.isUpdate = false;
    } else if (this.business == "update") {
      this.admApiForm = AdmApiForm.UpdateForm(this.fb);
      this.admApiService.findOne(this.apiId).then(response => {
        this.admApi = response;
        AdmApiForm.bindingData(this.admApiForm, this.admApi);
      })
    }
  }

  /**
   * @description : submit data
   * @param admApi : the infomation of object
   */
  submit(admApi) {
    if (this.isUpdate) {
      this.updateAdmApi(admApi);
    } else {
      this.createAdmApi(admApi);
    }
  }

  /**
   * @description create new object
   * @param admApi the infomation of object
   */
  createAdmApi(admApi) {
    this.admApiService.create(admApi)
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
   * @param admApi the infomation of object
   */
  updateAdmApi(admApi) {
    this.admApiService.update(admApi)
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
    if (this.admApiForm.get('apiName').invalid) {
      return false;
    }
    // check method is valid
    if (this.admApiForm.get('apiMethod').invalid) {
      return false;
    }
    // check url is valid
    if (this.admApiForm.get('apiUrl').invalid) {
      return false;
    }
    return true;
  }

  goBack() {
    this.location.back();
  }
}
