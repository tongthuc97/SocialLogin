import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentForm } from './document-form.component';

import { DocumentService } from './document.service';
import { DataTable } from 'angular2-datatable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';

import { DocumentPageInfo } from './DocumentPageInfo';
import { Document } from './document';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../../common/dialog/dialog.service';
import { AuthGuardSubmenu } from '../../../../../authentication/guard/auth.guard-submenu';
import { CommonUtil } from '../../../../common/util/common-util';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  providers: [DocumentService, DialogService, DataTable]
})

/**
 * @description: Coordinator quản lý bảng 'Document'
 */
export class DocumentListComponent implements OnInit {
  // api version id
  apiVersionId: number;
  // >Quản lý page trả về từ server
  documentInfo: DocumentPageInfo;
  documents: Document[];
  totalPages: number;
  currentPage = 0;
  pageLength: number;
  totalElements: number;
  // >filter search.
  filterSearch: string = '';
  // >checker.
  currentPageView: number;
  fromNumber: number;
  toNumber: number;

  // list type
  listType = CommonUtil.getListDocumentType();
   

  // list type
  listSourceType = CommonUtil.getListSourceType();


  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    private router: Router,
    private translate: TranslateService,
    private authGuardSubmenu: AuthGuardSubmenu,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) { this.toastr.setRootViewContainerRef(vcr); }

  ngOnInit() {
    this.apiVersionId = +this.route.snapshot.parent.params['apiVersionId'];
    // get datas.
    this.findAll(this.apiVersionId, this.filterSearch, this.currentPage);
  }

  /**
   * @description: Hàm gọi từ dữ liệu bảng 'Document' theo số trang
   * @param currentPage: số trang muốn lấy
   */
  findAll(apiVersionId: number, filterSearch: string, currentPage: number) {
    this.documentService.getDocuments(apiVersionId, filterSearch, currentPage).then(
      documentInfo => {
        this.documentInfo = documentInfo;
        this.documents = this.documentInfo.content;
        this.pageLength = this.documentInfo.content.length;
        this.totalElements = this.documentInfo.totalElements;
        this.totalPages = this.documentInfo.totalPages;
        if (!(this.totalPages > 0)) {
          this.currentPage = -1;
        }
        this.setCurrentPage();
      }).catch(
        error => {
          console.log(error);
        });
  }

  getTypeById(id: number) {
    return CommonUtil.getDocumentTypeById(id);
  }

  dowloadFile(source: string) {
    window.open(this.documentService.documentApi + "/download/" + source, "_blank");
  }

  viewDetail(source: string) {
    window.open(source, "_blank");
  }

  search(filterSearch: string) {
    this.filterSearch = filterSearch;
    this.findAll(this.apiVersionId, this.filterSearch, this.currentPage);
  }

  /**
   * @description: Coordinator quản lý việc chuyển trang
   * @param page: số trang
   */
  choosePageNumber(page: number) {
    var flag = false;
    if (this.currentPage > page) {
      if (this.documentInfo.first == false) {
        flag = true;
      }
    } else if (this.currentPage < page) {
      if (this.documentInfo.last == false) {
        flag = true;
      }
    } else {
      flag = true;
    }
    if (flag == true) {
      this.currentPage = page;
      this.findAll(this.apiVersionId, this.filterSearch, this.currentPage);
    }
  }
  private setCurrentPage() {
    if (this.documentInfo.numberOfElements > 0) {
      this.currentPageView = this.documentInfo.number + 1;
    } else {
      this.currentPageView = 0;
    }
    var numberOfElements = this.documentInfo.numberOfElements;
    var size = this.documentInfo.size;
    this.fromNumber = (this.currentPageView - 1) * size + 1;
    this.toNumber = (this.currentPageView - 1) * size + numberOfElements;
    if (this.toNumber < 1) {
      this.fromNumber = 0;
      this.toNumber = 0;
    }
  }
  /**
   * @description: Dùng để xóa 1 bản ghi
   * @param documentId 
   */
  delete(document: Document) {
    document.checked = true;
    this.dialogService
      .confirm('Confirm Information', 'Are you sure to delete?')
      .subscribe(response => {
        if (response == true) {
          this.documentService.delete(document.documentId)
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
          document.checked = false;
        }
      })
  }

  // To Authorize User
  isAuthoriziedNavigation(): boolean {
    var isAuthorizied = this.authGuardSubmenu.isAuthoriziedWithCurrentUrl(this.router.url);
    return isAuthorizied;
  }
}
