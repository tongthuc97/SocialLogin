import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseMessageComponent } from '../../common/util/response-message/response-message.component';
import { SubscriberForm } from './subscriber-form.component';

import { SubscriberService } from './subscriber.service';
import { DialogService } from '../../common/dialog/dialog.service';

import { DataTable } from 'angular2-datatable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';

import { SubscriberPageInfo } from './SubscriberPageInfo';
import { Subscriber } from './Subscriber';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  providers: [SubscriberService, DialogService, DataTable]
})

/**
 * @description: Coordinator quản lý bảng 'Subscriber'
 */
export class SubscriberListComponent implements OnInit {
  // >Quản lý page trả về từ server
  subscriberInfo: SubscriberPageInfo;
  subscribers: Subscriber[];
  totalPages: number;
  currentPage = 0;
  pageLength: number;
  totalElements: number;
  //.
  // >Liên quan tới message trả về từ server.
  responseMessage: string;
  httpStatus: number;
  task: string;
  //.
  // >filter search.
  filterForm: FormGroup;
  switchGetSubscribers = false;
  filterObject: Subscriber;
  //.
  // >checker.
  checkAllItemFlag = false;
  currentPageView: number;
  fromNumber: number;
  toNumber: number;

  numberDeleteItems = 0;
  // thông tin sắp xếp trang
  key = 'userId';
  reverse = 1;

  constructor(
    private subscriberService: SubscriberService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) { this.toastr.setRootViewContainerRef(vcr); }

  ngOnInit() {
    // initialize forms.
    this.filterForm = SubscriberForm.subscriberForm(this.fb, '');
    // get datas.
    this.findAll(this.currentPage);
  }

  orderList(key: string) {
    if(this.key !=key) {
      this.key = key;
      this.reverse = 1;
    } else {
      this.reverse = this.reverse*(-1);
    }
  }

  /**
   * @description: Hàm gọi từ dữ liệu bảng 'Subscriber' theo số trang
   * @param currentPage: số trang muốn lấy
   */
  findAll(currentPage: number) {
    this.subscriberService.getAllSubscriber(currentPage,10).then(
      subscriberInfo => {
        this.subscriberInfo = subscriberInfo;
        this.subscribers = this.subscriberInfo.content;
        this.pageLength = this.subscriberInfo.content.length;
        this.totalElements = this.subscriberInfo.totalElements;
        this.totalPages = this.subscriberInfo.totalPages;
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

  /**
   * @description: Hàm tìm kiếm
   * @param subscriber: Thông tin tìm kiếm
   * @param page: số trang muốn lấy
   */
  search(subscriber: Subscriber, page: number) {
    this.filterObject = subscriber;
    this.switchGetSubscribers = true;
    this.subscriberService.search(subscriber, page, 10)
      .then(subscriberInfo => {
        this.subscriberInfo = subscriberInfo;
        this.subscribers = this.subscriberInfo.content;
        this.pageLength = this.subscriberInfo.content.length;
        this.totalElements = this.subscriberInfo.totalElements;
        this.totalPages = this.subscriberInfo.totalPages;
        if (!(this.totalPages > 0)) {
          this.currentPage = -1;
        }
        this.setCurrentPage();
      });
  }

  /**
   * @description: Coordinator quản lý việc chuyển trang
   * @param page: số trang
   */
  choosePageNumber(page: number) {
    var flag = false;
    if (this.currentPage > page) {
      if (this.subscriberInfo.first == false) {
        flag = true;
      }
    } else if (this.currentPage < page) {
      if (this.subscriberInfo.last == false) {
        flag = true;
      }
    } else {
      flag = true;
    }
    if (flag == true) {
      this.currentPage = page;
      if (this.switchGetSubscribers == false)
        this.findAll(this.currentPage);
      else
        this.search(this.filterObject, this.currentPage);
    }
  }
  private setCurrentPage() {
    if (this.subscriberInfo.numberOfElements > 0) {
      this.currentPageView = this.subscriberInfo.number + 1;
    } else {
      this.currentPageView = 0;
    }
    var numberOfElements = this.subscriberInfo.numberOfElements;
    var size = this.subscriberInfo.size;
    this.fromNumber = (this.currentPageView - 1) * size + 1;
    this.toNumber = (this.currentPageView - 1) * size + numberOfElements;
    if (this.toNumber < 1) {
      this.fromNumber = 0;
      this.toNumber = 0;
    }
  }
  /**
   * @description: Dùng để xóa 1 bản ghi
   * @param subscriberId 
   */
  delete(subscriber: Subscriber) {
    subscriber.checked = true;
    this.dialogService
      .confirm('Confirm Information', 'Are you sure to delete?')
      .subscribe(response => {
        if (response == true) {
          this.task = "Delete";
          this.subscriberService.deleteSubscriber(subscriber.subscriberId)
            .then(response => {
              this.responseMessage = response;
              this.httpStatus = response;
              this.toastr.success('', 'Deleted successfully!', { dismiss: 'controlled' })
                .then((toast: Toast) => {
                  setTimeout(() => {
                    this.toastr.dismissToast(toast);
                  }, 3000);
                });
              this.findAll(this.currentPage);
            })
            .catch(error => {
              this.toastr.error('', 'Delete process failed!', { dismiss: 'controlled' })
                .then((toast: Toast) => {
                  setTimeout(() => {
                    this.toastr.dismissToast(toast);
                  }, 3000);
                });
              this.responseMessage = error;
              this.httpStatus = error.status;
            });
        } else {
          subscriber.checked = false;
        }
      })
  }

  /**
   * @description: Check tất cả items khi click ô checkbox all.
   */
  checkAllItem() {
    this.checkAllItemFlag = !this.checkAllItemFlag;
    this.subscribers.forEach(item => {
      item.checked = this.checkAllItemFlag;
    });
  }

  /**
   * @description: Xóa các items được chọn.
   */
  deleteCheckedItems() {
    var entityIds = [];
    this.subscribers.forEach(item => {
      if (item.checked == true) {
        entityIds.push(item.subscriberId);
      }
    });
    if (entityIds.length > 0) {
      this.dialogService.confirm('Confirm Information', 'Are you sure to delete?')
        .subscribe(response => {
          if (response == true) {
            this.task = "Delete";
            this.subscriberService.deleteAllBatch(entityIds)
              .then(response => {
                this.responseMessage = response;
                this.httpStatus = response;
                this.checkAllItemFlag = false;
                this.choosePageNumber(this.currentPage);
                this.numberDeleteItems = 0;
                this.toastr.success('', 'Deleted successfully!', { dismiss: 'controlled' })
                  .then((toast: Toast) => {
                    setTimeout(() => {
                      this.toastr.dismissToast(toast);
                    }, 3000);
                  });
              })
              .catch(error => {
                this.numberDeleteItems = 0;
                this.checkAllItemFlag = false;
                this.responseMessage = error;
                this.httpStatus = error.status;
                this.choosePageNumber(this.currentPage);
                this.toastr.error('', 'Delete process failed!', { dismiss: 'controlled' })
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
  countNumberDeleteItems(){
    this.numberDeleteItems = 0;
    this.subscribers.forEach(item => {
      if (item.checked == true) {
        this.numberDeleteItems += 1;
      }
    });
  }

  getNumberDeleteItems(): number{
    return this.numberDeleteItems;
  }

}
