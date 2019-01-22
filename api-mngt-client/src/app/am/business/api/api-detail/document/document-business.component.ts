import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DocumentForm } from './document-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DocumentService } from './document.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { browser } from 'protractor';

@Component({
  selector: 'app-document-business',
  templateUrl: './document-business.component.html',
  styleUrls: ['./document-business.component.css'],
  providers: [DocumentService]
})

/**
 * @description: Component quản lý việc chỉnh sửa.
 */
export class DocumentBusinessComponent implements OnInit {
  private sub: any;
  id: number;
  business: string;
  documentForm: FormGroup;
  document: any;
  // Liên quan tới message trả về từ server.
  responseMessage: string;
  httpStatus: number;
  //.
  isUpdate: boolean = true;

  // api version id
  apiVersionId: number;

  sourceType: number;

  // list type
  listType = [
    { id: 1, value: 'How to' },
    { id: 2, value: 'Samples & SDK' },
    { id: 3, value: 'Public Forum' },
    { id: 4, value: 'Support Forum' },
    { id: 5, value: 'Other' },
  ];

  // list type
  listSourceType = [
    { id: 1, value: 'Url' },
    { id: 2, value: 'File' }
  ];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private documentService: DocumentService,
    private fb: FormBuilder,
    private translate: TranslateService,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // get api version id
    this.apiVersionId = +this.route.snapshot.parent.params['apiVersionId'];
    // Lấy bản ghi theo 'id' từ @PathParam
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.business = params['business'];
      this.documentForm = DocumentForm.documentForm(this.fb, this.business);
      if (this.business == 'create') {
        this.isUpdate = false;
        this.documentForm = DocumentForm.documentForm(this.fb, this.business);
        this.documentForm.patchValue({
          sourceType: 1,
          type: 1,
          amApiVersion: {
            apiVersionId: this.apiVersionId,
          },
        });
        this.sourceType = 1;
      }
      if (this.business == 'update') {
        this.isUpdate = true;
        this.detailBusiness(this.business, this.documentForm, this.id);
      }
    });
  }

  detailBusiness(business, documentForm, id) {
    this.documentService.findOne(id)
      .then(response => {
        this.document = response;
        DocumentForm.bindingData(documentForm, this.document);
        this.sourceType = this.documentForm.value.sourceType;
      })
      .catch(error => console.log("errors: " + error));
  }

  /**
   * @description : Hàm gọi Update
   * @param document : truyền object cần chỉnh sửa.
   */
  submit(document) {
    if (document.documentId == "") {
      this.documentService.create(document)
        .then(response => {
          this.responseMessage = response;
          this.httpStatus = response;
          this.goBack();
        })
        .catch(error => {
          this.responseMessage = error;
          this.httpStatus = error.status;
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
    } else {
      this.documentService.update(document)
        .then(response => {
          this.responseMessage = response;
          this.httpStatus = response;
          this.goBack();
        })
        .catch(error => {
          this.responseMessage = error;
          this.httpStatus = error.status;
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

  onImport(event) {
    var file = event.srcElement.files[0];
    this.documentForm.patchValue({
      source: file.name
    });
    if (file) {
      this.documentService.uploadFile(file)
        .then(response => {
          this.responseMessage = response;
          this.httpStatus = response;
        })
        .catch(error => {
          this.responseMessage = error;
          this.httpStatus = error.status;
          this.toastr.error('', 'Upload file fail', { dismiss: 'controlled' })
            .then((toast: Toast) => {
              setTimeout(() => {
                this.toastr.dismissToast(toast);
              }, 3000);
            });
        });
    }
  }

  selectSourceType() {
    this.sourceType = this.documentForm.value.sourceType;
    this.documentForm.get('source').setValue('');
  }

  goBack() {
    this.location.back();
  }
}
