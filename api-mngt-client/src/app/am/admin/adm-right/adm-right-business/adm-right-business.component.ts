import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AdmRightService } from '../adm-right.service';
import { AdmRightForm } from '../adm-right-form.component';
import { AdmRight } from '../adm-right';
import { AdmApi } from '../../adm-api/adm-api';
import { AdmApiService } from '../../adm-api/adm-api.service';
import { AdmAccessService } from '../../adm-access/adm-access.service';
import { AdmAccess } from '../../adm-access/adm-access';

@Component({
    selector: 'app-adm-right-business',
    templateUrl: './adm-right-business.component.html',
    providers: [AdmRightService, AdmApiService, AdmAccessService]
})

/**
 * @description: Component quản lý việc chỉnh sửa.
 */
export class AdmRightBusinessComponent implements OnInit {
    rightId: number;
    business: string;
    admRightForm: FormGroup;
    admRight: AdmRight = new AdmRight();

    listAdmApiForRight: AdmApi[] = [];

    listAdmAccess: AdmAccess[] = [];

    listAdmApiForAccess: AdmApi[] = [];

    listAdmRightParent: AdmRight[] = [];

    isUpdate: boolean = true;

    isChooseAccess: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private admRightService: AdmRightService,
        private admApiService: AdmApiService,
        private admAccessService: AdmAccessService,
        private fb: FormBuilder,
        private translate: TranslateService,
        public toastr: ToastsManager, vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this.getDataInput();
        this.getListAdmApi();
        this.getListAdmAccess();
        this.getListAdmRight();
    }

    private getDataInput() {
        this.route.params.subscribe(params => {
            // get business from url
            this.business = params['business'];
            // get right id from url
            this.rightId = +params['id'];
            this.bindingData();
        });
    }

    private getListAdmRight() {
        this.admRightService.getListAdmRightParent().then(reponse => {
            this.listAdmRightParent = reponse.data;
        });
    }

    private getListAdmApi() {
        this.admApiService.getListAdmApi()
            .then(response => {
                this.listAdmApiForRight = JSON.parse(JSON.stringify(response.data));
                this.listAdmApiForAccess = response.data;
                this.listAdmAccess.forEach(item => {
                    item.listAdmApi = JSON.parse(JSON.stringify(this.listAdmApiForAccess));
                });
            });
    }

    private getListAdmAccess() {
        this.admAccessService.getListAdmAccess()
            .then(response => {
                this.listAdmAccess = response.data;
                this.listAdmAccess.forEach(item => {
                    item.listAdmApi = JSON.parse(JSON.stringify(this.listAdmApiForAccess));
                });
            });

    }

    private bindingData() {
        if (this.business == "create") {
            this.admRightForm = AdmRightForm.CreateForm(this.fb);
            this.isUpdate = false;
        } else if (this.business == "update") {
            this.admRightForm = AdmRightForm.UpdateForm(this.fb);
            this.admRightService.findOne(this.rightId).then(response => {
                this.admRight = response;
                AdmRightForm.bindingData(this.admRightForm, this.admRight);
                this.responseToObject(this.admRight);
            })
        }
    }

    private responseToObject(admRight: any) {
        this.checkApiForRight(this.listAdmApiForRight, admRight);

        admRight.admAccessRights.forEach(accessRight => {
            this.listAdmAccess.forEach(access => {
                if (accessRight.admAccessList.accessId == access.accessId) {
                    access.checked = true;
                    this.checkApiForAccess(access.listAdmApi, accessRight)
                }
            });
        });
        console.log(admRight);
    }

    private checkApiForRight(listAdmApiForRight: any, admRight: any) {
        listAdmApiForRight.forEach(api => {
            admRight.admApiRights.forEach(apiRight => {
                if (api.apiId == apiRight.admApi.apiId) {
                    api.checked = true;
                }
            });
        });
    }

    private checkApiForAccess(listAdmApiForRight: any, accessRight: any) {
        listAdmApiForRight.forEach(api => {
            accessRight.admAccessRightApis.forEach(apiRight => {
                if (api.apiId == apiRight.admApi.apiId) {
                    api.checked = true;
                }
            });
        });
    }

    chooseAccess(accessId: number) {
        this.isChooseAccess = true;
        this.listAdmAccess.forEach(item => {
            if (item.accessId == accessId) {
                item.choosed = true;
                this.listAdmApiForAccess = item.listAdmApi;
            } else {
                item.choosed = false;
            }
        });

    }

    /**
     * @description : submit data
     * @param admRight : the infomation of object
     */
    submit(admRight) {
        // get form data
        this.formDataToObject(admRight);
        // get list api for right
        let rightApiIds: number[] = [];
        this.listAdmApiForRight.forEach(item => {
            if (item.checked) {
                rightApiIds.push(item.apiId);
            }
        })
        this.admRight.admApiIds = rightApiIds;
        // get list access for right
        let admAccesss: AdmAccess[] = [];
        this.listAdmAccess.forEach(item => {
            if (item.checked) {
                let accessApiIds: number[] = [];
                item.listAdmApi.forEach(api => {
                    if (api.checked) {
                        accessApiIds.push(api.apiId);
                    }
                })
                item.admApiIds = accessApiIds;
                admAccesss.push(item);
            }
        });
        this.admRight.listAdmAccess = admAccesss;

        if (this.isUpdate) {
            this.updateAdmRight(this.admRight);
        } else {
            this.createAdmRight(this.admRight);
        }
    }

    private formDataToObject(admRightData: any) {
        this.admRight.rightCode = admRightData.rightCode;
        this.admRight.rightName = admRightData.rightName;
        this.admRight.parentRightId = admRightData.parentRightId;
        if (admRightData.status) {
            this.admRight.status = 1;
        } else if (!admRightData.status) {
            this.admRight.status = 0;
        } else {
            this.admRight.status = 0;
        }
        this.admRight.rightOrder = admRightData.rightOrder;

        if (admRightData.hasChild) {
            this.admRight.hasChild = 1;
        } else {
            this.admRight.hasChild = 0;
        }
        this.admRight.urlRewrite = admRightData.urlRewrite;
        this.admRight.iconUrl = admRightData.iconUrl;
        this.admRight.description = admRightData.description;
        this.admRight.applicationId = admRightData.applicationId
    }

    /**
     * @description create new object
     * @param admRight the infomation of object
     */
    createAdmRight(admRight) {
        this.admRightService.create(admRight)
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
     * @param admRight the infomation of object
     */
    updateAdmRight(admRight) {
        this.admRightService.update(admRight)
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
        if (this.admRightForm.get('rightName').invalid) {
            return false;
        }
        // check method is valid
        if (this.admRightForm.get('rightCode').invalid) {
            return false;
        }
        return true;
    }

    goBack() {
        this.location.back();
    }
}
