import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/guard/authentication.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageItem, LanguageItemList } from '../i18n-setting';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Http } from '@angular/http';
import { Constants } from './common/util/constants';
import { Observable } from 'rxjs';
import { TokenInfo } from '../authentication/sso-processing/token-info';
import { UserInfo } from '../authentication/sso-processing/user-info';
@Component({
  selector: 'app-am',
  templateUrl: './am.component.html',
  styleUrls: ['./am.component.css'],
  providers: [Idle]
})
export class AmComponent implements OnInit {

  userInfo: UserInfo;
  tokenInfo: TokenInfo;

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  private expireTime: number = 0;
  private timer;
  private sub;

  ListLanguage: LanguageItem[];
  SelectedLanguage: LanguageItem;
  constructor(
    private http: Http,
    private idle: Idle,
    private authenticationService: AuthenticationService,
    private router: Router,
    private translate: TranslateService,
  ) {
    this.ListLanguage = LanguageItemList;
    translate.use(localStorage.getItem(Constants.KEY_LANGUAGE));
    // Get current language
    this.ListLanguage.forEach(lang => {
      if (lang.Key === translate.currentLang) {
        this.SelectedLanguage = lang;
      }
    });

    idle.setIdle(5);
    idle.setTimeout(10);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');


    idle.onTimeout.subscribe(() => {
      alert('Timeout');
      this.idleState = 'Timed out!';
      this.timedOut = true;
      localStorage.clear();
      this.router.navigate(['/auth', { sessionExpirate: 'true' }]);
    });
  }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem(Constants.CURRENT_USER));
    console.log("expire time: " + Number(localStorage.getItem(Constants.EXPIRE_TIME)));

    this.countdownTimer();
  }

  logout() {
    localStorage.removeItem(Constants.IS_AUTHENTIC);
    localStorage.removeItem(Constants.ACCESS_TOKEN);
    localStorage.removeItem(Constants.REFRESH_TOKEN);
    localStorage.removeItem(Constants.SESSION_STATE);
    localStorage.removeItem(Constants.CURRENT_USER);
    this.router.navigate(['/auth']);
  }

  onSelectLanguage(lang: LanguageItem) {
    this.SelectedLanguage = lang;
    localStorage.setItem(Constants.KEY_LANGUAGE, lang.Key);
    window.location.reload();
  }

  /**
   * @param expireTime the time tokens expire
   */
  countdownTimer() {
    this.expireTime = +localStorage.getItem(Constants.EXPIRE_TIME);
    if (isNaN(this.expireTime)) {
      this.router.navigate(['/auth', { sessionExpirate: 'true' }]);
    }
    this.timer = Observable.timer(0, 86400);
    // subscribing to a observable returns a subscription object
    this.sub = this.timer.subscribe(t => this.checkExpiredToken());
  }

  /**
   * @description Check for expired token
   * if token is expired, redirect to login page
   */
  checkExpiredToken() {
    debugger;
    let now = new Date().getTime();
    if (this.expireTime <= now + 5000) {
      this.authenticationService.getAccessTokenByRefreshToken()
        .then(response => {
          this.tokenInfo = response.data;
          localStorage.setItem(Constants.ACCESS_TOKEN, "Bearer " + this.tokenInfo.accessToken);
          localStorage.setItem(Constants.EXPIRE_TIME, this.tokenInfo.expiresIn + "");
          localStorage.setItem(Constants.REFRESH_TOKEN, this.tokenInfo.refreshToken);
          localStorage.setItem(Constants.IS_AUTHENTIC, "true");
        })
        .catch(error => {
          localStorage.setItem(Constants.IS_AUTHENTIC, "false");
        });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

