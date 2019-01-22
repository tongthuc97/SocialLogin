import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DataTable } from 'angular2-datatable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';

import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { AdmRoleService } from './adm-role.service';
import { DialogService } from '../../common/dialog/dialog.service';
import { AdmRoleRes } from './adm-role';
import { AdmRoleForm } from './adm-role-form.component';
import { CommonUtil } from '../../common/util/common-util';
import { AdmRolePageInfo } from './adm-role-page-info';

@Component({
    selector: 'app-adm-role-list',
    templateUrl: './adm-role-list.component.html',
    providers: [AdmRoleService, DialogService, DataTable]
})

/**
 * @description: Coordinator quản lý bảng 'AdmRole'
 */
export class AdmRoleListComponent implements OnInit {
    // admRole page
    admRoleInfo: AdmRolePageInfo;
    // list admRole 
    admRoles: AdmRoleRes[];
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
    searchObject: AdmRoleRes;
    // >checker.
    checkAllItemFlag = false;
    currentPageView: number;
    fromElement: number;
    toElement: number;

    numberDeleteItems = 0;

    constructor(
        private admRoleService: AdmRoleService,
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
        this.filterForm = AdmRoleForm.SearchForm(this.fb);
        // initialize object
        this.searchObject = new AdmRoleRes();
        // get datas.
        this.getPageAdmRole(this.searchObject, this.currentPage);
    }

    /**
     * @description: Hàm tìm kiếm
     * @param admRole: Thông tin tìm kiếm
     * @param page: số trang muốn lấy
     */
    getPageAdmRole(admRole: AdmRoleRes, page: number) {
        this.searchObject = admRole;
        this.admRoleService.getPageAdmRole(admRole, page)
            .then(response => {
                console.log(response)
                this.admRoleInfo = response.data;
                this.admRoles = this.admRoleInfo.content;
                this.pageLength = this.admRoleInfo.content.length;
                this.totalElements = this.admRoleInfo.totalElements;
                this.totalPages = this.admRoleInfo.totalPages;
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
            this.getPageAdmRole(this.searchObject, this.currentPage);
            page.value = pageNumber + 1;
        }
    }

    private setCurrentPage() {
        if (this.admRoleInfo.numberOfElements > 0) {
            this.currentPageView = this.admRoleInfo.number + 1;
        } else {
            this.currentPageView = 0;
        }
        var numberOfElements = this.admRoleInfo.numberOfElements;
        var size = this.admRoleInfo.size;
        this.fromElement = (this.currentPageView - 1) * size + 1;
        this.toElement = (this.currentPageView - 1) * size + numberOfElements;
        if (this.toElement < 1) {
            this.fromElement = 0;
            this.toElement = 0;
        }
    }

    /**
     * @description Delete a list admRoles
     * @param entityIds the list ids
     */
    private delete(entityIds: number[]) {
        this.dialogService
            .confirm('Confirm Information', 'Are you sure to delete?')
            .subscribe(response => {
                if (response == true) {
                    this.admRoleService.deleteAdmRolesById(entityIds)
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
                            this.getPageAdmRole(this.searchObject, this.currentPage);
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
     * @param admRoleId 
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
        this.admRoles.forEach(item => {
            item.checked = this.checkAllItemFlag;
        });
    }

    /**
     * @description: Xóa các items được chọn.
     */
    deleteCheckedItems() {
        var entityIds = [];
        this.admRoles.forEach(item => {
            if (item.checked == true) {
                entityIds.push(item.roleId);
            }
        });
        if (entityIds.length > 0) {
            this.delete(entityIds);
        }
    }
    countNumberDeleteItems() {
        this.numberDeleteItems = 0;
        this.admRoles.forEach(item => {
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
