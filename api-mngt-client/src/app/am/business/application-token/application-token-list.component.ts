import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationTokenForm } from './application-token-form.component';

import { ApplicationTokenService } from './application-token.service';
import { DialogService } from '../../common/dialog/dialog.service';

import { DataTable } from 'angular2-datatable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { ApplicationTokenPageInfo } from './application-tokenPageInfo';
import { ApplicationToken } from './application-token';
import { Application } from '../application/application';
import { ApplicationService } from '../application/application.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { TranslateService } from '@ngx-translate/core';
import { CommonUtil } from '../../common/util/common-util';


@Component({
  selector: 'app-application-token',
  templateUrl: './application-token-list.component.html',
  providers: [ApplicationTokenService, ApplicationService, DialogService, DataTable]
})

/**
 * @description: Coordinator quản lý bảng 'ApplicationToken'
 */
export class ApplicationTokenListComponent implements OnInit {
  // >Quản lý page trả về từ server
  private sub: any;
  applicationTokenInfo: ApplicationTokenPageInfo;
  applicationTokens: ApplicationToken[];
  totalPages: number;
  currentPage = 0;
  pageLength: number;
  totalElements: number;
  // >filter search.
  filterForm: FormGroup;
  switchGetApplicationTokens = false;
  filterObject = new ApplicationToken();
  // >checker.
  checkAllItemFlag = false;
  currentPageView: number;
  fromNumber: number;
  toNumber: number;
  numberDeleteItems = 0;
  // combox
  listApplication: Application[];
  listGrantType = CommonUtil.getListGrantType();
  listStatus = CommonUtil.getListStatus()
  // thông tin sắp xếp trang
  key = 'applicationTokenId';
  reverse = -1;

  applicationId: number;
  application: Application;

  constructor(
    private route: ActivatedRoute,
    private applicationTokenService: ApplicationTokenService,
    private applicationService: ApplicationService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private authGuardSubmenu: AuthGuardSubmenu,
    private translate: TranslateService,
    private router: Router
  ) { this.toastr.setRootViewContainerRef(vcr); }

  ngOnInit() {
    // initialize forms.
    this.applicationId = this.route.snapshot.parent.params['applicationId'];
    this.filterForm = ApplicationTokenForm.applicationTokenForm(this.fb, '');
    this.filterForm.patchValue({
      grantType: '0',
      status: '0',
      amApplication: ({
        applicationId: this.applicationId,
      }),
    });
    // get datas.
    this.applicationService.findOne(this.applicationId)
      .then(response => {
        this.filterObject.amApplication = response;
        this.search(this.filterObject, this.currentPage);
      })
      .catch(error => {
        console.log(error);
      });
    // this.findAll(this.currentPage);
    this.applicationService.getListApplication().then(applications => {
      this.listApplication = applications;
    })
      .catch(error => {
        console.log(error);
      })
  }

  orderList(key: string) {
    if (this.key != key) {
      this.key = key;
      this.reverse = 1;
    } else {
      this.reverse = this.reverse * (-1);
    }
  }
  getStatusById(id: number) {
    return CommonUtil.getStatusById(id);
  }


  getGrantTypeById(id: number) {
    return CommonUtil.getGrantTypeById(id);
  }

  /**
   * @description: Hàm gọi từ dữ liệu bảng 'ApplicationToken' theo số trang
   * @param currentPage: số trang muốn lấy
   */
  findAll(currentPage: number) {
    this.applicationTokenService.getAllApplicationToken(currentPage, 20).then(
      applicationTokenInfo => {
        this.applicationTokenInfo = applicationTokenInfo;
        this.setPageInfo();
      }).catch(
      error => {
        console.log(error);
      }
      );
  }

  setPageInfo() {
    this.applicationTokens = this.applicationTokenInfo.content;
    this.pageLength = this.applicationTokenInfo.content.length;
    this.totalElements = this.applicationTokenInfo.totalElements;
    this.totalPages = this.applicationTokenInfo.totalPages;
    if (!(this.totalPages > 0)) {
      this.currentPage = -1;
    }
    this.setCurrentPage();
  }

  /**
   * @description: Hàm tìm kiếm
   * @param applicationToken: Thông tin tìm kiếm
   * @param page: số trang muốn lấy
   */
  search(applicationToken: ApplicationToken, page: number) {
    this.filterObject = applicationToken;
    this.switchGetApplicationTokens = true;
    this.applicationTokenService.filterSearch(applicationToken.amApplication.applicationId, applicationToken, page, 20)
      .then(applicationTokenInfo => {
        this.applicationTokenInfo = applicationTokenInfo;
        this.setPageInfo();
        this.countNumberDeleteItems();
      });
  }

  /**
   * @description: Coordinator quản lý việc chuyển trang
   * @param page: số trang
   */
  choosePageNumber(page: number) {
    var flag = false;
    if (this.currentPage > page) {
      if (this.applicationTokenInfo.first == false) {
        flag = true;
      }
    } else if (this.currentPage < page) {
      if (this.applicationTokenInfo.last == false) {
        flag = true;
      }
    } else {
      flag = true;
    }
    if (flag == true) {
      this.currentPage = page;
      if (this.switchGetApplicationTokens == false)
        this.findAll(this.currentPage);
      else
        this.search(this.filterObject, this.currentPage);
    }
  }
  private setCurrentPage() {
    if (this.applicationTokenInfo.numberOfElements > 0) {
      this.currentPageView = this.applicationTokenInfo.number + 1;
    } else {
      this.currentPageView = 0;
    }
    var numberOfElements = this.applicationTokenInfo.numberOfElements;
    var size = this.applicationTokenInfo.size;
    this.fromNumber = (this.currentPageView - 1) * size + 1;
    this.toNumber = (this.currentPageView - 1) * size + numberOfElements;
    if (this.toNumber < 1) {
      this.fromNumber = 0;
      this.toNumber = 0;
    }
  }
  /**
   * @description: Dùng để xóa 1 bản ghi
   * @param applicationTokenId 
   */
  delete(applicationToken: ApplicationToken) {
    applicationToken.checked = true;
    this.dialogService
      .confirm('Confirm Information', 'Are you sure to delete?')
      .subscribe(response => {
        if (response == true) {
          this.applicationTokenService.deleteApplicationToken(applicationToken.applicationTokenId)
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
          applicationToken.checked = false;
        }
      })
  }

  /**
   * @description: Check tất cả items khi click ô checkbox all.
   */
  checkAllItem() {
    this.checkAllItemFlag = !this.checkAllItemFlag;
    this.applicationTokens.forEach(item => {
      item.checked = this.checkAllItemFlag;
    });
  }

  /**
   * @description: Xóa các items được chọn.
   */
  deleteCheckedItems() {
    var entityIds = [];
    this.applicationTokens.forEach(item => {
      if (item.checked == true) {
        entityIds.push(item.applicationTokenId);
      }
    });
    if (entityIds.length > 0) {
      this.dialogService.confirm('Confirm Information', 'Are you sure to delete?')
        .subscribe(response => {
          if (response == true) {
            this.applicationTokenService.deleteAllBatch(entityIds)
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
  }

  countNumberDeleteItems() {
    this.numberDeleteItems = 0;
    this.applicationTokens.forEach(item => {
      if (item.checked == true) {
        this.numberDeleteItems += 1;
      }
    });
  }

  getNumberDeleteItems(): number {
    return this.numberDeleteItems;
  }
  isAuthoriziedNavigation(): boolean {
    var isAuthorizied = this.authGuardSubmenu.isAuthoriziedWithCurrentUrl(this.router.url);
    return isAuthorizied;
  }

}
