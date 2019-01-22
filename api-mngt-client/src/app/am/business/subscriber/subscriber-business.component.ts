import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SubscriberForm } from './subscriber-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ResponseMessageComponent } from '../../common/util/response-message/response-message.component';
import { SubscriberService } from './subscriber.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';

@Component({
  selector: 'app-subscriber-business',
  templateUrl: './subscriber-business.component.html',
  providers: [SubscriberService]
})

/**
 * @description: Component quản lý việc chỉnh sửa.
 */
export class SubscriberBusinessComponent implements OnInit {
  private sub: any;
  subscriberId: number;
  business: string;
  businessName: string;
  subscriberForm: FormGroup;
  subscriber: any;
  // Liên quan tới message trả về từ server.
  responseMessage: string;
  httpStatus: number;
  task: string;
  //.
  disabledForm: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private subscriberService: SubscriberService,
    private fb: FormBuilder,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // Khởi tạo form sửa
    // Lấy bản ghi theo 'subscriberId' từ @PathParam
    this.sub = this.route.params.subscribe(params => {
      this.subscriberId = params['subscriberId'];
      this.business = params['business'];
      this.subscriberForm = SubscriberForm.subscriberForm(this.fb, this.business);
      if (this.business == 'create') {
        this.businessName = "Create Subscriber";
        this.subscriberForm = SubscriberForm.subscriberForm(this.fb, this.business);
      }
      if (this.business == 'detail') {
        this.disabledForm = true;
        this.businessName = "Subscriber Information";
        this.detailBusiness(this.business, this.subscriberForm, this.subscriberId);
      }
      if (this.business == 'update') {
        this.businessName = "Update Subscriber";
        this.detailBusiness(this.business, this.subscriberForm, this.subscriberId);
      }
    });
  }

  detailBusiness(business, subscriberForm, subscriberId) {
    this.subscriberService.findOne(subscriberId)
      .then(response => {
        this.subscriber = response;
        SubscriberForm.bindingData(subscriberForm, this.subscriber);
      })
      .catch(error => console.log("errors: " + error));
  }

  /**
   * @description : Hàm gọi Update
   * @param subscriber : truyền object cần chỉnh sửa.
   */
  submit(subscriber) {
    if (subscriber.subscriberId == "") {
      this.task = "Create Subscriber";
      this.subscriberService.createSubscriber(subscriber)
        .then(response => {
          this.responseMessage = response;
          this.httpStatus = response;
          this.goBack();
        })
        .catch(error => {
          this.toastr.error(this.responseMessage, 'Create process failed!', { dismiss: 'controlled' })
            .then((toast: Toast) => {
              setTimeout(() => {
                this.toastr.dismissToast(toast);
              }, 3000);
            });
          this.responseMessage = error;
          this.httpStatus = error.status;
        });
    } else {
      this.task = "Update Subscriber";
      this.subscriberService.updateSubscriber(subscriber)
        .then(response => {
          this.responseMessage = response;
          this.httpStatus = response;
          this.goBack();
        })
        .catch(error => {
          this.toastr.error(this.responseMessage, 'Update process failed!', { dismiss: 'controlled' })
            .then((toast: Toast) => {
              setTimeout(() => {
                this.toastr.dismissToast(toast);
              }, 3000);
            });
          this.responseMessage = error;
          this.httpStatus = error.status;
        });
    }

  }

  goBack() {
    this.location.back();
  }


}
