import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Injectable } from '@angular/core';

import { CartService } from './cart.service';
import { AuthService } from './auth.service';
@Injectable({
    providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {
    constructor(private authService: AuthService,
        private cartService: CartService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {

        if (!this.authService.isLoggedIn) {
            if (this.cartService.items.length !== 0) {
                return this.router.navigate(["/auth/login"], {
                    queryParams: {
                        returnTo: "/checkout/checkout"
                    }
                });
            } else {
                return this.router.navigate(["/"]);
            }
        }
        return true;
    }
}