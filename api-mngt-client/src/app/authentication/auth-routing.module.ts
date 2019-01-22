import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthenLoginComponent } from './authen-login/authen-login.component';


const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'authen-login', component: AuthenLoginComponent }
];

@NgModule({
    declarations: [LoginComponent, AuthenLoginComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        HttpModule,
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
    exports: [RouterModule]
})
export class AuthRoutingModule { }
