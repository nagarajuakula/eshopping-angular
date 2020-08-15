import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from 'src/app/shared/models/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html'
}
)
export class ProductDetailsComponent implements OnInit {

    selectedProductId: number;
    isFromCart = false;
    isLoggedIn = false;
    product: Product;

    constructor(private router: Router,
        private aroute: ActivatedRoute,
        private authService: AuthService,
        private productsService: ProductsService,
        private cartService: CartService) { }

    ngOnInit() {
        this.selectedProductId = +this.aroute.snapshot.params['id'];
        this.aroute.snapshot.queryParams['fromCart'] ? this.isFromCart = true : this.isFromCart = false;
        this.product = this.productsService.getProduct(this.selectedProductId);
        this.isLoggedIn = this.authService.isLoggedIn;
    }

    addProductToCart(productId: number) {
        this.cartService.addToCart(productId);
    }

    editProduct() {
        this.router.navigate(["../edit-product", this.product.id], { relativeTo: this.aroute });
    }

    deleteProduct() {
        this.productsService.deleteProduct(this.product.id);
    }

    checkout() {
        this.cartService.items.push(this.selectedProductId);
        this.router.navigate(["/checkout/checkout"], { relativeTo: this.aroute});
    }
}