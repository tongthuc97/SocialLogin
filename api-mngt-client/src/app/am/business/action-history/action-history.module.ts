import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ActionHistoryComponent } from './action-history.component';
import { ActionHistoryDetailComponent } from './action-history-detail/action-history-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponseMessage2Module } from '../../common/util/response-message-2/response-message-2.module';
import { ActionHistoryService } from './action-history.service';
import { DialogService } from '../../common/dialog/dialog.service';
import { DataTableModule } from "angular2-datatable";
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { AuthGuard } from '../../../authentication/guard/auth.guard';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';

const routes: Routes = [
 
  { path: '',  component: ActionHistoryComponent, pathMatch: 'full' },
  { path: ':id/detail', component: ActionHistoryDetailComponent, pathMatch: 'full' },

]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ResponseMessage2Module,
    DataTableModule,
    ToastModule.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: CustomHandler },
      isolate: false
    })
  ],
  declarations: [
    ActionHistoryComponent,
    ActionHistoryDetailComponent,
  ],
  exports: [RouterModule],
  providers: [ActionHistoryService, DialogService]
})
export class ActionHistoryModule { }

