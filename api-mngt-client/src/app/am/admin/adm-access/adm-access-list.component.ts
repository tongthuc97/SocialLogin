import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DataTable } from 'angular2-datatable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { AdmAccessService } from './adm-access.service';
import { DialogService } from '../../common/dialog/dialog.service';
import { AdmAccess } from './adm-access';
import { AdmAccessForm } from './adm-access-form.component';
import { CommonUtil } from '../../common/util/common-util';
import { AdmAccessPageInfo } from './adm-access-page-info';

@Component({
    selector: 'app-adm-access-list',
    templateUrl: './adm-access-list.component.html',
    providers: [AdmAccessService, DialogService, DataTable]
})

/**
 * @description: Coordinator quản lý bảng 'AdmAccess'
 */
export class AdmAccessListComponent implements OnInit {
    // admAccess page
    admAccessInfo: AdmAccessPageInfo;
    // list admAccess 
    admAccesss: AdmAccess[];
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
    searchObject: AdmAccess;
    // >checker.
    checkAllItemFlag = false;
    currentPageView: number;
    fromElement: number;
    toElement: number;

    numberDeleteItems = 0;

    listApiMethod = CommonUtil.getListApiMethod();

    constructor(
        private admAccessService: AdmAccessService,
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
        this.filterForm = AdmAccessForm.SearchForm(this.fb);
        // initialize object
        this.searchObject = new AdmAccess();
        // get datas.
        this.getPageAdmAccess(this.searchObject, this.currentPage);
    }

    /**
     * @description: Hàm tìm kiếm
     * @param admAccess: Thông tin tìm kiếm
     * @param page: số trang muốn lấy
     */
    getPageAdmAccess(admAccess: AdmAccess, page: number) {
        this.searchObject = admAccess;
        this.admAccessService.getPageAdmAccess(admAccess, page)
            .then(response => {
                console.log(response)
                this.admAccessInfo = response.data;
                this.admAccesss = this.admAccessInfo.content;
                this.pageLength = this.admAccessInfo.content.length;
                this.totalElements = this.admAccessInfo.totalElements;
                this.totalPages = this.admAccessInfo.totalPages;
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
            this.getPageAdmAccess(this.searchObject, this.currentPage);
            page.value = pageNumber + 1;
        }
    }

    private setCurrentPage() {
        if (this.admAccessInfo.numberOfElements > 0) {
            this.currentPageView = this.admAccessInfo.number + 1;
        } else {
            this.currentPageView = 0;
        }
        var numberOfElements = this.admAccessInfo.numberOfElements;
        var size = this.admAccessInfo.size;
        this.fromElement = (this.currentPageView - 1) * size + 1;
        this.toElement = (this.currentPageView - 1) * size + numberOfElements;
        if (this.toElement < 1) {
            this.fromElement = 0;
            this.toElement = 0;
        }
    }

    /**
     * @description Delete a list admAccesss
     * @param entityIds the list ids
     */
    private delete(entityIds: number[]) {
        this.dialogService
            .confirm('Confirm Information', 'Are you sure to delete?')
            .subscribe(response => {
                if (response == true) {
                    this.admAccessService.deleteAdmAccesssById(entityIds)
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
                            this.getPageAdmAccess(this.searchObject, this.currentPage);
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
     * @param admAccessId 
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
        this.admAccesss.forEach(item => {
            item.checked = this.checkAllItemFlag;
        });
    }

    /**
     * @description: Xóa các items được chọn.
     */
    deleteCheckedItems() {
        var entityIds = [];
        this.admAccesss.forEach(item => {
            if (item.checked == true) {
                entityIds.push(item.accessId);
            }
        });
        if (entityIds.length > 0) {
            this.delete(entityIds);
        }
    }
    countNumberDeleteItems() {
        this.numberDeleteItems = 0;
        this.admAccesss.forEach(item => {
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
