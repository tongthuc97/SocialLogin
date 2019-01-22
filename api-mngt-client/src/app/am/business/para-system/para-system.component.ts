import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ParaSystemForm } from './para-system-form';

import { ParaSystemService } from './para-system.service';
import { DialogService } from '../../common/dialog/dialog.service';
import { ParaSystemInfo } from './para-system-info';
import { ParaSystem } from './para-system';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-para-system',
  templateUrl: './para-system.component.html',
  styleUrls: ['./para-system.component.css']
})

/**
 * @description: Coordinator manages 'ParaSystem' table
 */
export class ParaSystemComponent implements OnInit {
  // >Manage paraSystem page information
  paraSystemInfo: ParaSystemInfo;
  paraSystems: ParaSystem[];
  currentPageView: number;
  fromNumber: number;
  toNumber: number;
  //.
  // >Involved message responsed from server
  isHideErrorDeleting: boolean;
  //.
  // >filter search.
  filterForm: FormGroup;
  switchGetParaSystems = false;
  filterObject: ParaSystem;
  //.
  // >checker.
  checkAllItemFlag = false;
  numberDeleteItems = 0;


  constructor(
    private paraSystemService: ParaSystemService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.initializeFilterForm();
    this.initializeResponseMessage();
    // Get all paraSystems.
    this.findAll(0);
  }

  initializeFilterForm() {
    this.filterForm = ParaSystemForm.getParaSystemForm(this.fb);
    this.filterForm.patchValue({
      status: 0
    });
  }

  initializeResponseMessage() {
    this.isHideErrorDeleting = false;
  }

  /**
   * @description: Setting attribute để hiển thị phân trang.
   */
  private setCurrentPage() {
    if (this.paraSystemInfo.numberOfElements > 0) {
      this.currentPageView = this.paraSystemInfo.number + 1;
    } else {
      this.currentPageView = 0;
    }
    var numberOfElements = this.paraSystemInfo.numberOfElements;
    var size = this.paraSystemInfo.size;
    this.fromNumber = (this.currentPageView - 1) * size + 1;
    this.toNumber = (this.currentPageView - 1) * size + numberOfElements;
    if (this.toNumber < 1) {
      this.fromNumber = 0;
      this.toNumber = 0;
    }
  }

  /**
   * @description: Hàm gọi từ dữ liệu bảng 'ParaSystem' theo số trang
   * @param currentPage: số trang muốn lấy
   */
  findAll(currentPage: number) {
    this.paraSystemService.findAll(currentPage).then(
      paraSystemInfo => {
        this.paraSystemInfo = paraSystemInfo;
        this.paraSystems = this.paraSystemInfo.content;
        this.setCurrentPage();
      }).catch(
      error => {
        console.log(error);
      }
      );
  }

  /**
   * @description: Hàm tìm kiếm
   * @param paraSystem: Thông tin tìm kiếm
   * @param page: số trang muốn lấy
   */
  search(paraSystem: ParaSystem, page: number) {
    this.filterObject = paraSystem;
    this.switchGetParaSystems = true;
    this.paraSystemService.advanceFilterSearch(paraSystem, page)
      .then(paraSystemInfo => {
        this.paraSystemInfo = paraSystemInfo;
        this.paraSystems = this.paraSystemInfo.content;
        this.setCurrentPage();
      });
  }

  /**
   * @description: Coordinator quản lý việc chuyển trang
   * @param page: số trang
   */
  choosePageNumber(page: number) {
    var flag = false;
    var currentPage = this.paraSystemInfo.number;
    if (currentPage > page) {
      if (this.paraSystemInfo.first == false) {
        flag = true;
      }
    } else if (currentPage < page) {
      if (this.paraSystemInfo.last == false) {
        flag = true;
      }
    } else {
      flag = true;
    }
    if (flag == true) {

      if (this.switchGetParaSystems == false)
        this.findAll(page);
      else
        this.search(this.filterObject, page);
    }
  }

  /**
   * @description: Dùng để xóa 1 bản ghi
   * @param paraSystemId 
   */
  delete(item: ParaSystem) {
    item.checked = true;
    this.dialogService
      .confirm('Confirm Information', 'Are you sure to delete?')
      .subscribe(response => {
        if (response == true) {
          this.paraSystemService.delete(item.id)
            .then(response => {
              this.isHideErrorDeleting = true;
              this.findAll(this.paraSystemInfo.number);
              this.toastr.success('Delete ParaSystem successfully', 'Success!');
            })
            .catch(error => {
              this.isHideErrorDeleting = true;
              item.checked = false;
              this.toastr.error('Fail to delete ParaSystem', 'Error!');
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
    this.paraSystems.forEach(item => {
      item.checked = this.checkAllItemFlag;
    });
  }

  /**
   * @description: Xóa các items được chọn.
   */
  deleteCheckedItems() {
    var entityIds = [];
    this.paraSystems.forEach(item => {
      if (item.checked == true) {
        entityIds.push(item.id);
      }
    });
    if (entityIds.length > 0) {
      this.dialogService.confirm('Confirm Information', 'Are you sure to delete?')
        .subscribe(response => {
          if (response == true) {
            var currentPage = this.paraSystemInfo.number;
            this.paraSystemService.deleteAllBatch(entityIds)
              .then(response => {
                this.isHideErrorDeleting = true;
                this.checkAllItemFlag = false;
                this.choosePageNumber(currentPage);
                this.toastr.success('Delete checked ParaSystems successfully', 'Success!');
              })
              .catch(error => {
                this.checkAllItemFlag = false;
                this.isHideErrorDeleting = true;
                this.choosePageNumber(currentPage);
                this.toastr.error('Fail to delete check ParaSystems', 'Error!');
              });
          }
        })
    }
  }

  countNumberDeleteItems() {
    this.numberDeleteItems = 0;
    this.paraSystems.forEach(item => {
      if (item.checked == true) {
        this.numberDeleteItems += 1;
      }
    });
  }

  getNumberDeleteItems(): number {
    return this.numberDeleteItems;
  }
}

