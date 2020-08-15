import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

    constructor(public cartService: CartService,
                private router: Router,
                private aRoute: ActivatedRoute,
                public authService: AuthService) {}

    ngOnInit() { }

    getCartItems() {
        this.router.navigate(['/cart']);
    }

    addProduct() {
        this.router.navigate(['/products/edit-product/new'], { relativeTo: this.aRoute});
    }

    login() {
        this.router.navigate(['auth/login'], { relativeTo: this.aRoute});
    }

    logout() {
        window.sessionStorage.removeItem("loggedInUser");
        this.authService.isLoggedIn = false;
        this.authService.user = null;
        this.cartService.items = [];
        this.router.navigate(["/"]);
    }
}