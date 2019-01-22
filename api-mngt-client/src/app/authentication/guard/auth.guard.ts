import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Constants } from '../../am/common/util/constants';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem(Constants.IS_AUTHENTIC) == 'true') {
            return true;
        }

        this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return false;
    }
}