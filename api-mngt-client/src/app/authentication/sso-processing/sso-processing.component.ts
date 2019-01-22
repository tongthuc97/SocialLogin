import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../guard/authentication.service';
import { Constants } from '../../am/common/util/constants';
import { Console } from '@angular/core/src/console';
import { TokenInfo } from './token-info';
import { UserInfo } from './user-info';

@Component({
  selector: 'app-sso-processing',
  templateUrl: './sso-processing.component.html',
  styleUrls: ['./sso-processing.component.css'],
  providers: [AuthenticationService]
})
export class SsoProcessingComponent implements OnInit {

  private tokenInfo: TokenInfo;
  private userInfo: UserInfo;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.returnUrl = localStorage.getItem(Constants.RETURN_URL);

    this.authenticationService.getUserInfo(this.getAuthorizationCode())
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

  getAuthorizationCode(): string {
    let code = this.activatedRoute.snapshot.queryParams["code"];
    return code;
  }

}
