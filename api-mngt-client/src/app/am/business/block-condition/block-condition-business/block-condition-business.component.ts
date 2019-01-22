import { ResponseMessage2 } from '../../../common/util/response-message-2/response-message-2';
import { BlockConditionForm } from '../block-condition-form';
import { BlockConditionService } from '../block-condition.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { BlockCondition } from '../block-condition';
import { TranslateService } from '@ngx-translate/core';
import { CommonUtil } from '../../../common/util/common-util';

@Component({
  selector: 'app-block-condition-business',
  templateUrl: './block-condition-business.component.html',
  styleUrls: ['./block-condition-business.component.css'],
  providers: [BlockConditionService]
})

export class BlockConditionBusinessComponent implements OnInit {
  private sub: any;
  amBlockId: number;
  blockCondition: BlockCondition;
  business: string;
  blockForm: FormGroup;
  // Liên quan tới message trả về từ server.

  responseMessage: ResponseMessage2;
  isHideError: boolean;

  isBlockIP = false;

  isUpdate: boolean = false;

  checkBlockExistWithValue: boolean = false;

  blackLists = CommonUtil.getListBlockConditionType();
  statuses = CommonUtil.getListStatus()
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private blockConditionService: BlockConditionService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    private translate: TranslateService,
    public vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.amBlockId = params['amBlockId'];
      this.business = params['business'];
      this.blockForm = BlockConditionForm.getBlockForm(this.fb, this.business);
      if (this.business == 'create') {
        this.isUpdate = false;
        this.blockForm = BlockConditionForm.getBlockForm(this.fb, this.business);
        this.blockForm.patchValue({
          blockStatus: '1',
        });
      }
      if (this.business == 'update') {
        this.isUpdate = true;
        this.blockConditionService.findOne(this.amBlockId)
          .then(response => {
            this.blockCondition = response;
            BlockConditionForm.setValueForm(this.blockForm, this.blockCondition)
          })
          .catch(error => console.log("errors: " + error));
      }
    });
  }
  submit(blockCondition) {
    this.responseMessage = new ResponseMessage2();
    if (blockCondition.amBlockId == "") {
      this.responseMessage.setTitle('Create Block Condition');
      this.blockConditionService.create(blockCondition)
        .then(response => {
          this.responseMessage.response = response;
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
              }, 2000);
            });
          this.responseMessage.response = error;
          this.isHideError = true;
        });
    } else {
      this.responseMessage.setTitle('Update Block Condition');
      this.blockConditionService.update(blockCondition)
        .then(response => {
          this.responseMessage.response = response;
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
              }, 2000);
            });
          this.responseMessage.response = error;
          this.isHideError = true;
        });
    }
  }

  blockExistWithValue(value: string) {
    this.blockConditionService.findByValue(value)
      .then(response => {
        this.checkBlockExistWithValue = true;
      })
      .catch(error => {
        this.checkBlockExistWithValue = false;
      });
  }

  updateBlockName(blockName: string) {
    if (blockName == "IP") {
      this.isBlockIP = true;
    } else {
      this.isBlockIP = false;
    }
  }

  goBack() {
    this.location.back();
  }

}

