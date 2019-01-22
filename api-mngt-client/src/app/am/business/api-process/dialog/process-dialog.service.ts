import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ProcessDialogComponent } from './process-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { ApiProcessService } from '../api-process.service';


@Injectable()
export class ProcessDialogService {

  constructor(
    private dialog: MdDialog,
    private apiProcessService: ApiProcessService
  ) { }

  public confirm(taskId: number): Observable<boolean> {
    
    let dialogRef: MdDialogRef<ProcessDialogComponent>;
        dialogRef = this.dialog.open(ProcessDialogComponent);

        this.apiProcessService.getTaskData(taskId)
        .then(response => {
          dialogRef.componentInstance.states = response.listState;
        })
        .catch(error => console.log('errors: ' + error));
    
        return dialogRef.afterClosed();
  }

}
