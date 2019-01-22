import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private translate: TranslateService
  ) {
    if (localStorage.getItem('keyLanguage') == undefined || localStorage.getItem('keyLanguage') == '') {
      localStorage.setItem('keyLanguage', 'vi')
    }
    translate.setDefaultLang(localStorage.getItem('keyLanguage'));
  }
}