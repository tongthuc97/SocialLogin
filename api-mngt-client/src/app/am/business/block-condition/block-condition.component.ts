import { DialogService } from '../../common/dialog/dialog.service';
import { Component, OnInit, NgModule, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseMessageComponent } from '../../common/util/response-message/response-message.component';
import { ResponseMessage2 } from '../../common/util/response-message-2/response-message-2';
import { BlockCondition } from './block-condition';
import { BlockConditionForm } from './block-condition-form';
import { BlockConditionInfo } from './block-condition-info';
import { BlockConditionService } from './block-condition.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { Router } from '@angular/router';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { TranslateService } from '@ngx-translate/core';
import { CommonUtil } from '../../common/util/common-util';

@Component({
  selector: 'app-block-condition',
  templateUrl: './block-condition.component.html',
  styleUrls: ['./block-condition.component.css'],
  providers: [BlockConditionService]
})
export class BlockConditionComponent implements OnInit {

  // >Quản lý page trả về từ server
  blockConditionInfo: BlockConditionInfo;
  blockConditions: BlockCondition[];
  currentPageView: number;
  fromNumber: number;
  toNumber: number;
  // .
  // >Liên quan tới message trả về từ server.
  responseMessage: ResponseMessage2;
  isHideErrorDeleting: boolean;
  // .
  // >filter search.
  filterForm: FormGroup;
  switchGetIpConditions = false;
  filterObject: BlockCondition;
  // .
  // >checker.
  checkAllItemFlag = false;

  numberDeleteItems = 0;

  blockConditionTypes = CommonUtil.getListBlockConditionType()
  statuses = CommonUtil.getListStatus()
  constructor(
    private blockConditionService: BlockConditionService,
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
    // Initialize forms.
    this.filterForm = BlockConditionForm.getBlockForm(this.fb, '');
    // Initialize responseMessage.
    this.responseMessage = new ResponseMessage2();
    this.isHideErrorDeleting = false;
    // Get datas.
    this.findAll(0);
  }

  /**
   * @description: Setting attribute để hiển thị phân trang.
   */
  private setCurrentPage() {
    if (this.blockConditionInfo.numberOfElements > 0) {
      this.currentPageView = this.blockConditionInfo.number + 1;
    } else {
      this.currentPageView = 0;
    }
    const numberOfElements = this.blockConditionInfo.numberOfElements;
    const size = this.blockConditionInfo.size;
    this.fromNumber = (this.currentPageView - 1) * size + 1;
    this.toNumber = (this.currentPageView - 1) * size + numberOfElements;
    if (this.toNumber < 1) {
      this.fromNumber = 0;
      this.toNumber = 0;
    }
  }

  /**
   * @description: Hàm gọi từ dữ liệu bảng 'blockCondition' theo số trang
   * @param currentPage: số trang muốn lấy
   */
  findAll(currentPage: number) {
    this.blockConditionService.findAll(currentPage).then(
      blockConditionInfo => {
        this.blockConditionInfo = blockConditionInfo;
        this.blockConditions = this.blockConditionInfo.content;
        this.setCurrentPage();
      }).catch(
        error => {
          console.log(error);
        }
      );
  }

  /**
   * @description: Hàm tìm kiếm
   * @param blockCondition: Thông tin tìm kiếm
   * @param page: số trang muốn lấy
   */
  search(blockCondition: BlockCondition, page: number) {
    this.numberDeleteItems = 0;
    this.filterObject = blockCondition;
    this.switchGetIpConditions = true;
    this.blockConditionService.filterSearch(blockCondition, page)
      .then(blockConditionInfo => {
        this.blockConditionInfo = blockConditionInfo;
        this.blockConditions = this.blockConditionInfo.content;
        this.setCurrentPage();
      });
  }

  /**
   * @description: Coordinator quản lý việc chuyển trang
   * @param page: số trang
   */
  choosePageNumber(page: number) {
    var flag = false;
    var currentPage = this.blockConditionInfo.number;
    var flag = false;
    var currentPage = this.blockConditionInfo.number;
    if (currentPage > page) {
      if (this.blockConditionInfo.first == false) {
        flag = true;
      }
    } else if (currentPage < page) {
      if (this.blockConditionInfo.last == false) {
        flag = true;
      }
    } else {
      flag = true;
    }
    this.numberDeleteItems = 0;
    if (flag == true) {
      if (this.switchGetIpConditions == false)
        this.findAll(this.blockConditionInfo.number);
      else
        this.search(this.filterObject, this.blockConditionInfo.number);
    }

  }

  /**
   * @description: Dùng để xóa 1 bản ghi
   * @param amBlockId
   */
  delete(item: BlockCondition) {
    item.checked = true;
    this.dialogService
      .confirm('Confirm Information', 'Are you sure to delete?')
      .subscribe(response => {
        if (response == true) {
          this.responseMessage.setTitle('Delete');
          this.blockConditionService.delete(item.amBlockId)
            .then(response => {
              this.responseMessage.response = response;
              this.isHideErrorDeleting = true;
              this.choosePageNumber(this.blockConditionInfo.number);
              let message;
              this.translate.get('Message.DeleteSuccess').subscribe((res: string) => {
                message = res;
              });
              this.toastr.success('', message, { dimiss: 'controlled' })
                .then((toast: Toast) => {
                  setTimeout(() => {
                    this.toastr.dismissToast(toast);
                  }, 2000);
                });
            })
            .catch(error => {
              this.responseMessage.response = error;
              this.isHideErrorDeleting = true;
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
    this.blockConditions.forEach(item => {
      item.checked = this.checkAllItemFlag;
    });
  }

  /**
   * @description: Xóa các items được chọn.
   */
  deleteCheckedItems() {
    var entityIds = [];
    this.blockConditions.forEach(item => {
      if (item.checked == true) {
        entityIds.push(item.amBlockId);
      }
    });
    this.dialogService.confirm('Confirm Information', 'Are you sure to delete?')
      .subscribe(response => {
        if (response == true) {
          var currentPage = this.blockConditionInfo.number;
          this.responseMessage.setTitle("Delete All");
          this.blockConditionService.deleteAllBatch(entityIds)
            .then(response => {
              this.responseMessage.response = response;
              this.isHideErrorDeleting = true;
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
                  }, 2000);
                });
            })
            .catch(error => {
              this.checkAllItemFlag = false;
              this.responseMessage.response = error;
              this.isHideErrorDeleting = true;
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

  countNumberDeleteItems() {
    this.numberDeleteItems = 0;
    this.blockConditions.forEach(item => {
      if (item.checked == true) {
        this.numberDeleteItems += 1;
      }
    });
  }

  getStatusById(id: number) {
    return CommonUtil.getStatusById(id);
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



