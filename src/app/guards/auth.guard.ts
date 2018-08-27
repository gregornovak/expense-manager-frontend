import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = localStorage.getItem('currentUser');
        const exp = localStorage.getItem('exp');

        if (currentUser && exp && this.expireChecker(exp))
            return true;

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});

        return false;
    }

    expireChecker(expiresAt: string): boolean {
        const current: number = + new Date();
        const exp: number = Number(JSON.parse(expiresAt)) * 1000;

        return exp > current;
    }
}
