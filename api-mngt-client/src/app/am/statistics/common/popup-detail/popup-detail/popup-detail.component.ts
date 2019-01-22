import { Component, OnInit, Input } from '@angular/core';
import { LogdataService } from '../../../logdata/logdata.service';
import { LogdataInfo } from '../../../logdata/logdata-info';
import { Logdata } from '../../../logdata/logdata';
import { SearchObject } from '../../search-object';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-popup-detail',
  templateUrl: './popup-detail.component.html',
  styleUrls: ['./popup-detail.component.css'],
  providers: [LogdataService]
})
export class PopupDetailComponent implements OnInit {


  public filterObject: SearchObject;

  // >Quản lý page trả về từ server
  logdataInfo: LogdataInfo;
  logdatas: Logdata[];
  currentPageView: number;
  fromNumber: number;
  toNumber: number;

  PAGE_SIZE : number = 5;

  constructor(
    private logdataService: LogdataService,
    public dialogRef: MdDialogRef<PopupDetailComponent>
  ) { }

  ngOnInit() {
    this.search(this.filterObject, 0);
  }

  /**
   * @description: Setting attribute để hiển thị phân trang.
   */
  private setCurrentPage() {
    if (this.logdataInfo.numberOfElements > 0) {
      this.currentPageView = this.logdataInfo.number + 1;
    } else {
      this.currentPageView = 0;
    }
    var numberOfElements = this.logdataInfo.numberOfElements;
    var size = this.logdataInfo.size;
    this.fromNumber = (this.currentPageView - 1) * size + 1;
    this.toNumber = (this.currentPageView - 1) * size + numberOfElements;
    if (this.toNumber < 1) {
      this.fromNumber = 0;
      this.toNumber = 0;
    }
  }

  /**
   * @description: Hàm tìm kiếm
   * @param conditionGroup: Thông tin tìm kiếm
   * @param page: số trang muốn lấy
   */
  search(filterObject: any, page: number) {
    this.filterObject = filterObject;
    console.log(filterObject)
    this.logdataService.filterSearch(filterObject, page, this.PAGE_SIZE)
      .then(logdataInfo => {
        this.logdataInfo = logdataInfo;
        this.logdatas = this.logdataInfo.content;
        console.log(this.logdataInfo.content)
        this.setCurrentPage();
      });
  }

  /**
   * @description: Coordinator quản lý việc chuyển trang
   * @param page: số trang
   */
  choosePageNumber(page) {
    var flag = true;
    var currentPage = this.logdataInfo.number;
    var totalPages = this.logdataInfo.totalPages;
    var pageNumber;
    if(page.valueAsNumber != null) {
        // La chu hay so thap phan
        if(isNaN(page.valueAsNumber) || !Number.isInteger(page.valueAsNumber)) {
            flag = false;
            page.value = currentPage + 1;
            this.currentPageView = currentPage + 1;
        } else {
            pageNumber = page.valueAsNumber - 1;
        }
    } else {
        pageNumber = page;
    }

    if (flag == true && currentPage > pageNumber && pageNumber < 0) {
        pageNumber = 0;
        page.value = pageNumber + 1;
    }
    if (flag == true && currentPage < pageNumber && pageNumber > totalPages-1) {
      pageNumber = totalPages-1;
      page.value = pageNumber + 1;

    }
    if (flag == true) {
        currentPage = pageNumber;
        this.currentPageView = currentPage + 1;
        this.search(this.filterObject, currentPage);
    }
  }
}
