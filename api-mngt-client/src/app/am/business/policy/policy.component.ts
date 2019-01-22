import { DialogService } from '../../common/dialog/dialog.service';
import { Component, OnInit, NgModule, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseMessageComponent } from '../../common/util/response-message/response-message.component';
import { ResponseMessage2 } from '../../common/util/response-message-2/response-message-2';
import { Policy } from './policy';
import { PolicyForm } from './policy-form';
import { PolicyInfo } from './policy-info';
import { PolicyService } from './policy.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonUtil } from '../../common/util/common-util';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
  providers: [PolicyService]
})
export class PolicyComponent implements OnInit {

  // >Quản lý page trả về từ server
  policyInfo: PolicyInfo;
  policies: Policy[];

  // Thông tin trang đang được hiện thị
  currentPageView: number;
  fromNumber: number;
  toNumber: number;

  // >filter search.
  filterForm: FormGroup;
  switchGetPolicy = false;
  filterObject: Policy;
  // >checker.
  checkAllItemFlag = false;
  numberDeleteItems = 0;

  quotaTypes = CommonUtil.getListQuotaType();
  policyTypes = CommonUtil.getListPolicyType();
  statuses = CommonUtil.getListStatus();

  constructor(
    private policyService: PolicyService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    private authGuardSubmenu: AuthGuardSubmenu,
    private translate: TranslateService,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // init search form
    this.filterForm = PolicyForm.policySearchForm(this.fb);
    // get data
    this.findAll(0);
  }

  /**
   * @description: Setting attribute để hiển thị phân trang.
   */
  private setCurrentPage() {
    if (this.policyInfo.numberOfElements > 0) {
      this.currentPageView = this.policyInfo.number + 1;
    } else {
      this.currentPageView = 0;
    }
    const numberOfElements = this.policyInfo.numberOfElements;
    const size = this.policyInfo.size;
    this.fromNumber = (this.currentPageView - 1) * size + 1;
    this.toNumber = (this.currentPageView - 1) * size + numberOfElements;
    if (this.toNumber < 1) {
      this.fromNumber = 0;
      this.toNumber = 0;
    }
    this.numberDeleteItems = 0;
  }

  /**
   * @description: Hàm gọi từ dữ liệu bảng 'policy' theo số trang
   * @param currentPage: số trang muốn lấy
   */
  findAll(currentPage: number) {
    this.policyService.findAll(currentPage).then(
      data => {
        this.policyInfo = data.data;
        this.policies = this.policyInfo.content;
        this.setCurrentPage();
      }).catch(
        error => {
          console.log(error);
        }
      );
  }

  /**
   * @description: Hàm tìm kiếm
   * @param policy: Thông tin tìm kiếm
   * @param page: số trang muốn lấy
   */
  search(policy: Policy, page: number) {
    this.filterObject = policy;
    this.switchGetPolicy = true;
    this.policyService.filterSearch(policy, page)
      .then(data => {
        this.policyInfo = data.data;
        this.policies = this.policyInfo.content;
        this.setCurrentPage();
      });
  }

  /**
   * @description: Coordinator quản lý việc chuyển trang
   * @param page: số trang
   */
  choosePageNumber(page: number) {
    var flag = false;
    var currentPage = this.policyInfo.number;
    var flag = false;
    var currentPage = this.policyInfo.number;
    if (currentPage > page) {
      if (this.policyInfo.first == false) {
        flag = true;
      }
    } else if (currentPage < page) {
      if (this.policyInfo.last == false) {
        flag = true;
      }
    } else {
      flag = true;
    }
    if (this.switchGetPolicy == true) {
      this.search(this.filterObject, this.policyInfo.number)
    } else {
      this.findAll(this.policyInfo.number);
    }

  }

  /**
   * @description: Dùng để xóa 1 bản ghi
   * @param amPolicyId
   */
  delete(item: Policy) {
    item.checked = true;
    this.dialogService
      .confirm('Confirm Information', 'Are you sure to delete?')
      .subscribe(response => {
        if (response == true) {
          this.policyService.delete(item.amPolicyId)
            .then(response => {
              this.findAll(this.policyInfo.number);
              let message;
              this.translate.get('Message.DeleteSuccess').subscribe((res: string) => {
                message = res;
              });
              this.toastr.success('', message, { dismiss: 'controlled' })
                .then((toast: Toast) => {
                  setTimeout(() => {
                    this.toastr.dismissToast(toast);
                  }, 2000);
                });
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
                  }, 2000);
                });
            });
        } else {
          item.checked = false;
        }
      })
  }

  /**
   * @description: Check tất cả items khi click ô checkbox all.
   */
  checkAllItem() {
    this.checkAllItemFlag = !this.checkAllItemFlag;
    this.policies.forEach(item => {
      item.checked = this.checkAllItemFlag;
    });
  }

  /**
   * @description: Xóa các items được chọn.
   */
  deleteCheckedItems() {
    var entityIds = [];
    this.policies.forEach(item => {
      if (item.checked == true) {
        entityIds.push(item.amPolicyId);
      }
    });
    this.dialogService.confirm('Confirm Information', 'Are you sure to delete?')
      .subscribe(response => {
        if (response == true) {
          var currentPage = this.policyInfo.number;
          this.policyService.deleteAllBatch(entityIds)
            .then(response => {
              this.checkAllItemFlag = false;
              this.choosePageNumber(currentPage);
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
              this.checkAllItemFlag = false;
              this.choosePageNumber(currentPage);
              let message;
              this.translate.get('Message.DeleteFail').subscribe((res: string) => {
                message = res;
              });
              this.toastr.error('', message, { dismiss: 'controlled' })
                .then((toast: Toast) => {
                  setTimeout(() => {
                    this.toastr.dismissToast(toast);
                  }, 2000);
                });
            });
        }
      })
  }

  getNumberDeleteItems(): number {
    return this.numberDeleteItems;
  }

  getStatusById(id: number) {
    return CommonUtil.getStatusById(id);
  }

  getQuotaTypeById(id: number) {
    return CommonUtil.getQuotaTypeById(id);
  }

  getPolicyTypeById(id: number) {
    return CommonUtil.getPolicyTypeById(id);
  }

  countNumberDeleteItems() {
    this.numberDeleteItems = 0;
    this.policies.forEach(item => {
      if (item.checked == true) {
        this.numberDeleteItems += 1;
      }
    });
  }
  isAuthoriziedNavigation(): boolean {
    var isAuthorizied = this.authGuardSubmenu.isAuthoriziedWithCurrentUrl(this.router.url);
    return isAuthorizied;
  }
}


