import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ApiVersionService } from '../api-detail/api-version/api-version.service';
import { CommonUtil } from '../../../common/util/common-util';
import { ApiVersion } from '../api-detail/api-version/api-version';



@Component({
    selector: 'app-api-update-state',
    templateUrl: './api-update-state.component.html',
    providers: [ApiVersionService]
})

/**
 * @description: Component quản lý việc chỉnh sửa.
 */
export class ApiUpdateStateComponent implements OnInit {
    apiVersionId: number;
    apiVersion: ApiVersion;

    listStatus = CommonUtil.getListApiState();

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private apiVersionService: ApiVersionService,
        public toastr: ToastsManager,
        private translate: TranslateService,
        public vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        // Lấy bản ghi theo 'apiVersionId' từ @PathParam
        this.route.params.subscribe(params => {
            this.apiVersionId = params['apiVersionId'];
            this.apiVersionService.findOne(this.apiVersionId)
                .then(response => {
                    this.apiVersion = response;
                    console.log(response);
                })
                .catch(error => console.log(error))
        });
    }
    /**
     * submit form data
     * @param data the value of form data
     */
    updateState(state: number) {
        debugger;
        this.apiVersionService.updateStateApi(this.apiVersionId, state)
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

    getApiStateById(id: number): string {
        return CommonUtil.getApiStateById(id);
    }

    goBack() {
        this.location.back();
    }
}
