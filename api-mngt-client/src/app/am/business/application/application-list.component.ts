import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseMessageComponent } from '../../common/util/response-message/response-message.component';
import { ApplicationForm } from './application-form.component';

import { ApplicationService } from './application.service';
import { DialogService } from '../../common/dialog/dialog.service';
import { SubscriberService } from '../subscriber/subscriber.service';
import { PolicyService } from '../policy/policy.service';

import { DataTable } from 'angular2-datatable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';

import { ApplicationPageInfo } from './ApplicationPageInfo';
import { Application } from './Application';
import { Subscriber } from '../subscriber/subscriber';
import { Policy } from '../policy/policy';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonUtil } from '../../common/util/common-util';

@Component({
    selector: 'app-application',
    templateUrl: './application-list.component.html',
    providers: [ApplicationService, PolicyService, SubscriberService, DialogService, DataTable]
})

export class ApplicationListComponent implements OnInit {
    // Quản lý page trả về từ server
    applicationInfo: ApplicationPageInfo;
    applications: Application[];
    currentPageView: number;
    totalPages: number;
    currentPage = 0;
    pageLength: number;
    totalElements: number;
    fromNumber: number;
    toNumber: number;

    //filter search
    filterForm: FormGroup;
    switchGetApplications = false;
    filterObject: Application;

    // thông tin combobox
    listSubscriber: Subscriber[];
    listPolicy: Policy[];
    policySelections: Array<any> = [];

    //checked
    checkAllItemFlag = false;
    numberDeleteItems = 0;

    listStatus = CommonUtil.getListStatus();

    constructor(
        private applicationService: ApplicationService,
        private subscriberService: SubscriberService,
        private policyService: PolicyService,
        private dialogService: DialogService,
        private fb: FormBuilder,
        public toastr: ToastsManager,
        public vcr: ViewContainerRef,
        private authGuardSubmenu: AuthGuardSubmenu,
        private translate: TranslateService,
        private router: Router
    ) { this.toastr.setRootViewContainerRef(vcr); }

    ngOnInit() {
        this.filterForm = ApplicationForm.applicationForm(this.fb, '');
        this.filterForm.patchValue({
            applicationStatus: '',
            name: '',
            description: '',
            amPolicy: ({
                amPolicyId: 0,
            }),
            amSubscriber: ({
                subscriberId: 0,
            }),
        });
        // get datas.
        this.findAll(this.currentPage);
        this.subscriberService.getListSubscriber().then(subscribers => {
            this.listSubscriber = subscribers;
        })
            .catch(error => {
                console.log(error);
            })
        this.policyService.findByPolicyTypeAndIsDeployed(3, 1).then(policys => {
            this.listPolicy = policys;
            this.initializePolicySelection();
        })
            .catch(error => {
                console.log(error);
            })
    }

    getListStatusById(id: number) {
        return CommonUtil.getStatusById(id);
    }

    findAll(currentPage: number) {
        this.applicationService.getAllApplication(currentPage, 20).then(
            applicationInfo => {
                this.applicationInfo = applicationInfo;
                this.applications = this.applicationInfo.content;
                this.pageLength = this.applicationInfo.content.length;
                this.totalElements = this.applicationInfo.totalElements;
                this.totalPages = this.applicationInfo.totalPages;
                if (!(this.totalPages > 0)) {
                    this.currentPage = -1;
                }
                this.setCurrentPage();
            }).catch(
            error => {
                console.log(error);
            }
            );
    }

    search(application: Application, page: number) {
        this.filterObject = application;
        this.switchGetApplications = true;
        this.applicationService.filterSearch(application.amSubscriber.subscriberId, application.amPolicy.amPolicyId, application, page, 20)
            .then(applicationInfo => {
                this.applicationInfo = applicationInfo;
                this.applications = this.applicationInfo.content;
                this.pageLength = this.applicationInfo.content.length;
                this.totalElements = this.applicationInfo.totalElements;
                this.totalPages = this.applicationInfo.totalPages;
                if (!(this.totalPages > 0)) {
                    this.currentPage = -1;
                }
                this.setCurrentPage();
                this.countNumberDeleteItems();
            });

    }

    choosePageNumber(page: number) {
        var flag = false;
        if (this.currentPage > page) {
            if (this.applicationInfo.first === false) {
                flag = true;
            }
        } else if (this.currentPage < page) {
            if (this.applicationInfo.last == false) {
                flag = true;
            }
        } else {
            flag = true;
        }
        if (flag == true) {
            this.currentPage = page;
            if (this.switchGetApplications == false)
                this.findAll(this.currentPage);
            else
                this.search(this.filterObject, this.currentPage);
        }
    }
    private setCurrentPage() {
        if (this.applicationInfo.numberOfElements > 0) {
            this.currentPageView = this.applicationInfo.number + 1;
        } else {
            this.currentPageView = 0;
        }
        var numberOfElements = this.applicationInfo.numberOfElements;
        var size = this.applicationInfo.size;
        this.fromNumber = (this.currentPageView - 1) * size + 1;
        this.toNumber = (this.currentPageView - 1) * size + numberOfElements;
        if (this.toNumber < 1) {
            this.fromNumber = 0;
            this.toNumber = 0;
        }
    }

    delete(application: Application) {
        application.checked = true;
        this.dialogService
            .confirm('Confirm Information', 'Are you sure to delete?')
            .subscribe(response => {
                if (response == true) {
                    this.applicationService.deleteApplication(application.applicationId)
                        .then(response => {
                            let message;
                            this.translate.get('Message.DeleteSuccess').subscribe((res: string) => {
                                message = res;
                            });
                            this.toastr.success('', message, { dismiss: 'controlled' })
                                .then((toast: Toast) => {
                                    setTimeout(() => {
                                        this.toastr.dismissToast(toast);
                                    }, 3000);
                                });
                            this.choosePageNumber(this.currentPage);
                        })
                        .catch(error => {
                            let message;
                            this.translate.get('Message.DeleteFail').subscribe((res: string) => {
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
                    application.checked = false;
                }
            })
    }

    checkAllItem() {
        this.checkAllItemFlag = !this.checkAllItemFlag;
        this.applications.forEach(item => {
            item.checked = this.checkAllItemFlag;
        });
    }

    deleteCheckedItems() {
        var entityIds = [];
        this.applications.forEach(item => {
            if (item.checked == true) {
                entityIds.push(item.applicationId);
            }
        });
        if (entityIds.length > 0) {
            this.dialogService.confirm('Confirm Information', 'Are you sure to delete?')
                .subscribe(response => {
                    if (response == true) {
                        this.applicationService.deleteAllBatch(entityIds)
                            .then(response => {
                                this.checkAllItemFlag = false;
                                this.choosePageNumber(this.currentPage);
                                this.numberDeleteItems = 0;
                                let message;
                                this.translate.get('Message.DeleteSuccess').subscribe((res: string) => {
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
                                this.numberDeleteItems = 0;
                                this.checkAllItemFlag = false;
                                this.choosePageNumber(this.currentPage);
                                let message;
                                this.translate.get('Message.DeleteFail').subscribe((res: string) => {
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
                })
        }
        this.countNumberDeleteItems();
    }

    countNumberDeleteItems() {
        this.numberDeleteItems = 0;
        this.applications.forEach(item => {
            if (item.checked == true) {
                this.numberDeleteItems += 1;
            }
        });
    }

    getNumberDeleteItems(): number {
        return this.numberDeleteItems;
    }

    initializePolicySelection() {
        let policy_datas = [];
        this.listPolicy.forEach(element => {
            var item = {
                id: null, text: null
            };
            item.text = element.displayName;
            item.id = element.amPolicyId;
            policy_datas.push(item);
        });
        this.policySelections = policy_datas;
    }

    isAuthoriziedNavigation(): boolean {
        var isAuthorizied = this.authGuardSubmenu.isAuthoriziedWithCurrentUrl(this.router.url);
        return isAuthorizied;
    }
}
