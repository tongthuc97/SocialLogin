import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponseMessageModule } from '../../common/util/response-message/response-message.module';
import { ResponseMessage2Module } from '../../common/util/response-message-2/response-message-2.module';
import { BlockConditionDetailComponent } from './block-condition-detail/block-condition-detail.component';
import { BlockConditionComponent } from './block-condition.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { DataTableModule } from 'angular2-datatable';
import { BlockConditionBusinessComponent } from './block-condition-business/block-condition-business.component';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';


const routes: Routes = [

  { path: '', component: BlockConditionComponent, pathMatch: 'full' },
  { path: ':amBlockId/detail', component: BlockConditionDetailComponent, pathMatch: 'full' },
  { path: ':business',canActivate: [AuthGuardSubmenu], component: BlockConditionBusinessComponent, pathMatch: 'full' },
  { path: ':amBlockId/:business',canActivate: [AuthGuardSubmenu], component: BlockConditionBusinessComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ResponseMessage2Module,
    ResponseMessageModule,
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
    BlockConditionComponent,
    BlockConditionDetailComponent,
    BlockConditionBusinessComponent,
  ],
  exports: [RouterModule],
  providers: [AuthGuardSubmenu]
})
export class BlockConditionModule { }
