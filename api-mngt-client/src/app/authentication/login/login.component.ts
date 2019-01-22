import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../guard/authentication.service';
import { AlertService } from '../alert/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageItem, LanguageItemList } from '../../i18n-setting';
import { Constants } from '../../am/common/util/constants';
import { TokenInfo } from '../sso-processing/token-info';
import { UserInfo } from '../sso-processing/user-info';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService, AlertService]
})

/**
 * Examine the handling of login requirements
 */
export class LoginComponent implements OnInit {

  model: any = {};
  private tokenInfo: TokenInfo;
  private userInfo: UserInfo;
  returnUrl: string;
  // list language use in system
  ListLanguage: LanguageItem[];
  // the selected language
  SelectedLanguage: LanguageItem;
  // check login
  hasError: boolean = false;
  // the response data when login successful

  /**
   * 
   * @param route the route
   * @param router the router
   * @param authenticationService the authenticationService
   * @param alertService the alertService
   * @param translate the translate 
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private translate: TranslateService
  ) {
    this.ListLanguage = LanguageItemList;
    translate.use(localStorage.getItem(Constants.KEY_LANGUAGE));
    // Get current language
    this.ListLanguage.forEach(lang => {
      if (lang.Key === translate.currentLang) {
        this.SelectedLanguage = lang;
      }
    });
  }

  ngOnInit() {
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   * @description login
   */
  login() {
    this.authenticationService.login(this.model.username, this.model.password)
      .then(response => {
        this.userInfo = response.data;
        this.tokenInfo = this.userInfo.accessTokenInfo;

        let now = new Date().getTime();
        let expireTime = now + (+this.tokenInfo.expiresIn) * 1000;

        localStorage.setItem(Constants.ACCESS_TOKEN, "Bearer " + this.tokenInfo.accessToken);
        localStorage.setItem(Constants.EXPIRE_TIME, expireTime + "");
        localStorage.setItem(Constants.REFRESH_TOKEN, this.tokenInfo.refreshToken);
        localStorage.setItem(Constants.IS_AUTHENTIC, "true");
        localStorage.setItem(Constants.CURRENT_USER, JSON.stringify(this.userInfo));

        this.router.navigate([this.returnUrl]);
      })
      .catch(error => {
        localStorage.setItem(Constants.IS_AUTHENTIC, "false");
        // this.router.navigate(["/"]);
      });
  }

  /**
   * @description Select the language to display
   * @param lang the language
   */
  onSelectLanguage(lang: LanguageItem) {
    this.SelectedLanguage = lang;
    localStorage.setItem(Constants.KEY_LANGUAGE, lang.Key);
    this.translate.use(lang.Key);
  }
}