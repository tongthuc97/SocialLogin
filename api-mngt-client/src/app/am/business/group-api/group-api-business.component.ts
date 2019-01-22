import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GroupApiForm } from './group-api-form.component';
import { GroupApiService } from './group-api.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { GroupApi } from './group-api';
import { TranslateService } from '@ngx-translate/core';
import { CommonUtil } from '../../common/util/common-util';



@Component({
  selector: 'app-group-api-business',
  templateUrl: './group-api-business.component.html',
  providers: [GroupApiService]
})

/**
 * @description: Component quản lý việc chỉnh sửa.
 */
export class GroupApiBusinessComponent implements OnInit {
  private sub: any;
  groupApiId: number;
  business: string;
  groupApiForm: FormGroup;
  groupApi: GroupApi;
  // Liên quan tới message trả về từ server.
  responseMessage: string;
  //.
  isUpdate: boolean = true;
  // dữ liệu hiện thị combobox

  listStatus = CommonUtil.getListStatus();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private apiTypeService: GroupApiService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    private translate: TranslateService,
    public vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    console.log(this.listStatus);
    // Khởi tạo form sửa
    // Lấy bản ghi theo 'groupApiId' từ @PathParam
    this.sub = this.route.params.subscribe(params => {
      this.groupApiId = params['groupApiId'];
      this.business = params['business'];
      this.groupApiForm = GroupApiForm.getCreateForm(this.fb, this.business);
      if (this.business == 'create') {
        this.isUpdate = false;
        this.groupApiForm = GroupApiForm.getCreateForm(this.fb, this.business);
        this.groupApiForm.patchValue({
          apiTypeStatus: '1',
        });

      }
      if (this.business == 'update') {
        this.isUpdate = true;
        this.apiTypeService.findOne(this.groupApiId)
          .then(response => {
            console.log(response)
            this.groupApi = response.data;
            GroupApiForm.bindingData(this.groupApiForm, this.groupApi);;
          })
          .catch(error => console.log("errors: " + error));
      }
    });
  }

  /**
   * submit form data
   * @param data the value of form data
   */
  submit(groupApi) {
    if (this.validData()) {
    if (groupApi.id == "") {
      this.apiTypeService.createGroupApi(groupApi)
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
      this.apiTypeService.updateGroupApi(groupApi)
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
  }
  /**
   * validate data when user submit form
   */
  private validData(): boolean {
    // check name valid
    this.groupApiForm.get('name').setValue(this.groupApiForm.get('name').value.trim());
    if (this.groupApiForm.get('name').invalid) {
      return false;
    }
    // check code valid
    this.groupApiForm.get('code').setValue(this.groupApiForm.get('code').value.trim());
    if (this.groupApiForm.get('code').invalid) {
      return false;
    }
    // check status valid
    this.groupApiForm.get('status').setValue(this.groupApiForm.get('status').value.trim());
    if (this.groupApiForm.get('status').invalid) {
      return false;
    }

    return true;
  }

  goBack() {
    this.location.back();
  }


}
