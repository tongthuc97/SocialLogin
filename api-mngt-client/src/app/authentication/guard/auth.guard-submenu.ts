import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Constants } from '../../am/common/util/constants';
import { UserInfo } from '../sso-processing/user-info';
import { Right } from '../../am/common/shared/sidebar/right';

@Injectable()
export class AuthGuardSubmenu implements CanActivate {
    userInfo: UserInfo;
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // console.log("AuthGuardSubmenu: " + url);
        if (this.isAuthoriziedWithCurrentUrl(state.url)) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/system']);
        return false;
    }

    isAuthoriziedWithCurrentUrl(url: string): boolean {
        try {
            this.userInfo = JSON.parse(localStorage.getItem(Constants.CURRENT_USER));
            let rights: Right[] = this.userInfo.rights;
            for (var i = 0; i < rights.length; i++) {
                if (url.startsWith(rights[i].urlRewrite)) {
                    return true;
                }
            }
        } catch (e) {

        }
        return false;
    }

    redirectToSystemPage(url: string) {
        if (!this.isAuthoriziedWithCurrentUrl(url)) {
            this.router.navigate(['/system']);
        }
    }
}