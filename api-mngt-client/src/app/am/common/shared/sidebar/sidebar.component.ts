import { Component, OnInit, AfterViewInit, Input, AfterViewChecked } from '@angular/core';
import { Right } from './right';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserInfo } from '../../../../authentication/sso-processing/user-info';
import { Constants } from '../../util/constants';
declare var Layout, App: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: []
})
export class SidebarComponent implements OnInit, AfterViewInit, AfterViewChecked {

  rights: Array<Right> = [];
  rootNavations: Right[];
  userInfo: UserInfo;
  constructor(
    private router: Router,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.getMenuRightByCurrentUser();
  }

  ngAfterViewInit() {
    Layout.init();
  }

  setRightsName() {
    for (let i = 0; i < this.rights.length; i++) {
      let rightNameTranlate;
      let rightNameTranlateKey = 'SIDEBAR.' + this.rights[i].rightName;
      this.translate.get(rightNameTranlateKey).subscribe((res: string) => {
        rightNameTranlate = res;
        this.rights[i].rightName = rightNameTranlate;

      });
    }
  }

  ngAfterViewChecked() {
    //App.init();

  }

  getChildRights(parentRightId: number): Right[] {
    let childRights = [];
    let totalRights = this.rights.length;
    for (let i = 0; i < totalRights; i++) {
      var item = this.rights[i];
      if (item.parentRightId == parentRightId && item.status == 1) {
        childRights.push(item);
      }
    }
    return childRights;
  }

  getMenuRightByCurrentUser() {
    try {
      this.userInfo = JSON.parse(localStorage.getItem(Constants.CURRENT_USER));
      this.rights = this.userInfo.rights;
      this.setRightsName();
    } catch (element) {
    }
  }
}
