import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { Toast } from 'ng2-toastr';
import { Location } from '@angular/common';
import { State } from '../state';
import { ApiProcessService } from '../api-process.service';
import { ApiProcessForm } from '../api-process-form.component';
import { TaskData } from '../task-data';
import { Task } from '../task';
import { ApiState } from '../api-state';

@Component({
  selector: 'app-api-process-business',
  templateUrl: './api-process-business.component.html',
  styleUrls: ['./api-process-business.component.css'],
  providers: [ApiProcessService]
})
export class ApiProcessBusinessComponent implements OnInit {

  taskId: number;
  taskData: Task;
  apiProcessForm: FormGroup;
  switch: boolean;

  processContent: string;
  states: State[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private apiProcessService: ApiProcessService,
    private translate: TranslateService,
    public toastr: ToastsManager,
    private fb: FormBuilder,
    public vcr: ViewContainerRef,
  ) { this.toastr.setRootViewContainerRef(vcr); }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => params.getAll('taskId')).subscribe(taskId => {
        this.taskId = +taskId;
        this.apiProcessForm = ApiProcessForm.apiProcessForm(this.fb);
        this.getTaskData(this.taskId);
        // this.apiProcessService.findOne(this.taskId)
        // .then(response => {
        //   this.apiVersion = response;
        // })
        // .catch(error => console.log('errors: ' + error));
      });
  }

  getTaskData(taskId: number) {
    this.apiProcessService.getTaskData(taskId)
      .then(response => {
        this.taskData = response;
        this.states = response.listState;
        if (this.states.length > 0) {
          this.switch = true;
        }else{
          this.switch = false;
        }
      })
      .catch(error => console.log('errors: ' + error));
  }

  process(stateId: number, processContent: string){
    let apiState: ApiState = new ApiState();
    apiState.taskId = this.taskId;
    apiState.state = stateId;
    apiState.processContent = processContent;
    this.apiProcessService.updateStateApi(apiState)
      .then(response => {
        this.goBack();
      })
      .catch(error => {
        let message;
        this.translate.get('Message.UpdateFail').subscribe((res: string) => {
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

  goBack() {
    this.location.back();
  }

}
