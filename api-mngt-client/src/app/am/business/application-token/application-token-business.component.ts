import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location, DatePipe } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApplicationTokenForm } from './application-token-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ResponseMessageComponent } from '../../common/util/response-message/response-message.component';
import { ApplicationTokenService } from './application-token.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { ApplicationService } from '../application/application.service';
import { Application } from '../application/application';
import { ApplicationToken } from './application-token';
import { TranslateService } from '@ngx-translate/core';
import { CommonUtil } from '../../common/util/common-util';

@Component({
  selector: 'app-application-token-business',
  templateUrl: './application-token-business.component.html',
  providers: [ApplicationTokenService, ApplicationService]
})

/**
 * @description: Component quản lý việc chỉnh sửa.
 */
export class ApplicationTokenBusinessComponent implements OnInit {
  private sub: any;
  business: string;
  applicationTokenForm: FormGroup;
  applicationToken = new ApplicationToken();
  // Liên quan tới message trả về từ server.
  responseMessage: string;

  listApplication: Application[];

  applicationId: number;
  application: Application;
  checkStartDate: boolean = true;
  checkEndDate: boolean = true;

  listGrantType = CommonUtil.getListGrantType();

  listStatus = CommonUtil.getListStatus();


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private applicationTokenService: ApplicationTokenService,
    private applicationService: ApplicationService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    private translate: TranslateService,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // Khởi tạo form sửa
    this.applicationId = this.route.snapshot.parent.params['applicationId'];
    this.applicationService.findOne(this.applicationId)
      .then(response => {
        this.application = response;
        this.applicationToken.amApplication = this.application;

      });
    this.onInit();
  }

  onInit() {
    this.sub = this.route.params.subscribe(params => {
      this.business = params['business'];
      this.applicationTokenForm = ApplicationTokenForm.applicationTokenForm(this.fb, this.business);
      if (this.business == 'create') {
        this.applicationTokenForm = ApplicationTokenForm.applicationTokenForm(this.fb, this.business);
        this.applicationTokenForm.patchValue({
          grantType: '0',
          amApplication: ({
            applicationId: this.applicationId,
          }),
          status: '1',
        });
      }
    });

    this.applicationService.getListApplication()
      .then(applications => {
        this.listApplication = applications;
      })
      .catch(error => {
        console.log(error);
      })
  }
  /**
   * @description : Hàm tạo mới token
   * @param applicationToken : thông tin token cần tạo mới
   */
  submit(applicationToken) {
    this.applicationTokenService.createApplicationToken(applicationToken.amApplication.applicationId, applicationToken)
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
  }

  goBack() {
    this.location.back();
  }

  checkValidEndDate() {
    var startDate = this.applicationTokenForm.controls['startDate'].value;
    var endDate = this.applicationTokenForm.controls['endDate'].value;
    if ((startDate != null && startDate != "") && (endDate != null && endDate != "") && endDate <= startDate) {
      this.checkEndDate = false;
    } else {
      this.checkEndDate = true;
    }
  }

  checkValidStartDate() {
    this.checkValidEndDate();
    var startDateStr = this.applicationTokenForm.controls['startDate'].value;
    if (startDateStr != null && startDateStr != "") {
      var dateNow = new Date();
      dateNow.setDate(dateNow.getDate() - 1);
      var startDate = new Date(startDateStr);
      if (startDate < dateNow) {
        this.checkStartDate = false;
      } else {
        this.checkStartDate = true;
      }
    } else {
      this.checkStartDate = true;
    }
  }


}
