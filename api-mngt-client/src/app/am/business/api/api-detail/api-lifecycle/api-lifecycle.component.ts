import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiLifecycle } from './api-lifecycle';
import { ApiLifecycleInfo } from './api-lifecycle-page';
import { ApiLifecycleService } from './api-lifecycle.service';
import { DialogService } from '../../../../common/dialog/dialog.service';
import { ResponseMessage2 } from '../../../../common/util/response-message-2/response-message-2';
import { ActivatedRoute } from '@angular/router';
import { CommonUtil } from '../../../../common/util/common-util';


@Component({
  selector: 'app-api-lifecycle',
  templateUrl: './api-lifecycle.component.html',
  styleUrls: ['./api-lifecycle.component.css'],
  providers: [ApiLifecycleService, DialogService]
})

/**
 * @description: Coordinator quản lý bảng 'ApiLifecycle'
 */
export class ApiLifecycleComponent implements OnInit {

  // api version id
  apiVersionId: number;

  apiLifecycles: ApiLifecycle[];

  states = CommonUtil.getListApiState();

  constructor(
    private route: ActivatedRoute,
    private apiLifecycleService: ApiLifecycleService,
    private dialogService: DialogService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.apiVersionId = +this.route.snapshot.parent.params['apiVersionId'];
    this.findAll();
  }

  getApiStateById(id: number): string {
    return CommonUtil.getApiStateById(id);
  }

  findAll() {
    this.apiLifecycleService.getListApiLifecycleByApiVersionId(this.apiVersionId).then(
      listApiLifecycle => {
        this.apiLifecycles = listApiLifecycle;
      }).catch(
      error => {
        console.log(error);
      }
      );
  }

}