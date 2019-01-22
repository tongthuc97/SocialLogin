import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DataTable } from 'angular2-datatable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { AdmApiService } from './adm-api.service';
import { DialogService } from '../../common/dialog/dialog.service';
import { AdmApi } from './adm-api';
import { AdmApiForm } from './adm-api-form.component';
import { CommonUtil } from '../../common/util/common-util';
import { AdmApiPageInfo } from './adm-api-page-info';

@Component({
    selector: 'app-adm-api-list',
    templateUrl: './adm-api-list.component.html',
    providers: [AdmApiService, DialogService, DataTable]
})

/**
 * @description: Coordinator quản lý bảng 'AdmApi'
 */
export class AdmApiListComponent implements OnInit {
    // admApi page
    admApiInfo: AdmApiPageInfo;
    // list admApi 
    admApis: AdmApi[];
    // total page
    totalPages: number;
    // curent page
    currentPage = 0;
    // page sizw
    pageLength: number;
    // toal elements
    totalElements: number;
    // >filter search.
    filterForm: FormGroup;
    // search restriction
    searchObject: AdmApi;
    // >checker.
    checkAllItemFlag = false;
    currentPageView: number;
    fromElement: number;
    toElement: number;

    numberDeleteItems = 0;

    listApiMethod = CommonUtil.getListApiMethod();

    constructor(
        private admApiService: AdmApiService,
        private dialogService: DialogService,
        private fb: FormBuilder,
        private router: Router,
        private translate: TranslateService,
        private authGuardSubmenu: AuthGuardSubmenu,
        public toastr: ToastsManager, vcr: ViewContainerRef
    ) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        // initialize forms.
        this.filterForm = AdmApiForm.SearchForm(this.fb);
        // initialize object
        this.searchObject = new AdmApi();
        // get datas.
        this.getPageAdmApi(this.searchObject, this.currentPage);
    }

    /**
     * @description: Hàm tìm kiếm
     * @param admApi: Thông tin tìm kiếm
     * @param page: số trang muốn lấy
     */
    getPageAdmApi(admApi: AdmApi, page: number) {
        this.searchObject = admApi;
        this.admApiService.getPageAdmApi(admApi, page)
            .then(response => {
                console.log(response)
                this.admApiInfo = response.data;
                this.admApis = this.admApiInfo.content;
                this.pageLength = this.admApiInfo.content.length;
                this.totalElements = this.admApiInfo.totalElements;
                this.totalPages = this.admApiInfo.totalPages;
                if (!(this.totalPages > 0)) {
                    this.currentPage = -1;
                }
                this.setCurrentPage();
                this.countNumberDeleteItems();
            }).catch(error => {
                console.log(error);
            });
    }

    /**
     * @description: Coordinator quản lý việc chuyển trang
     * @param page: số trang
     */
    choosePageNumber(page) {
        var flag = true;
        var pageNumber;

        if (page.valueAsNumber != null) {
            if (isNaN(page.valueAsNumber)) {
                flag = false;
                page.value = this.currentPage + 1;
                // this.currentPageView = 1;
            } else {
                pageNumber = page.value - 1;
            }
        } else {
            pageNumber = page;
        }

        if (flag == true && this.currentPage > pageNumber && pageNumber < 0) {
            pageNumber = 0;
        }
        if (flag == true && this.currentPage < pageNumber && pageNumber > this.totalPages - 1) {
            pageNumber = this.totalPages - 1;
        }
        if (flag == true && !Number.isInteger(pageNumber)) {
            flag = false;
            page.value = this.currentPage + 1;
        }
        if (flag == true) {
            this.currentPage = pageNumber;
            this.getPageAdmApi(this.searchObject, this.currentPage);
            page.value = pageNumber + 1;
        }
    }

    private setCurrentPage() {
        if (this.admApiInfo.numberOfElements > 0) {
            this.currentPageView = this.admApiInfo.number + 1;
        } else {
            this.currentPageView = 0;
        }
        var numberOfElements = this.admApiInfo.numberOfElements;
        var size = this.admApiInfo.size;
        this.fromElement = (this.currentPageView - 1) * size + 1;
        this.toElement = (this.currentPageView - 1) * size + numberOfElements;
        if (this.toElement < 1) {
            this.fromElement = 0;
            this.toElement = 0;
        }
    }

    /**
     * @description Delete a list admApis
     * @param entityIds the list ids
     */
    private delete(entityIds: number[]) {
        this.dialogService
            .confirm('Confirm Information', 'Are you sure to delete?')
            .subscribe(response => {
                if (response == true) {
                    this.admApiService.deleteAdmApisById(entityIds)
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
                            this.getPageAdmApi(this.searchObject, this.currentPage);
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
                }
            })
    }


    /**
     * @description: Dùng để xóa 1 bản ghi
     * @param admApiId 
     */
    deleteOneItem(id: number) {
        var entityIds = [];
        entityIds.push(id);
        this.delete(entityIds);
    }

    /**
     * @description: Check tất cả items khi click ô checkbox all.
     */
    checkAllItem() {
        this.checkAllItemFlag = !this.checkAllItemFlag;
        this.admApis.forEach(item => {
            item.checked = this.checkAllItemFlag;
        });
    }

    /**
     * @description: Xóa các items được chọn.
     */
    deleteCheckedItems() {
        var entityIds = [];
        this.admApis.forEach(item => {
            if (item.checked == true) {
                entityIds.push(item.apiId);
            }
        });
        if (entityIds.length > 0) {
            this.delete(entityIds);
        }
    }
    countNumberDeleteItems() {
        this.numberDeleteItems = 0;
        this.admApis.forEach(item => {
            if (item.checked == true) {
                this.numberDeleteItems += 1;
            }
        });
    }

    getNumberDeleteItems(): number {
        return this.numberDeleteItems;
    }

    // To Authorize User
    isAuthoriziedNavigation(): boolean {
        var isAuthorizied = this.authGuardSubmenu.isAuthoriziedWithCurrentUrl(this.router.url);
        return isAuthorizied;
    }

}
