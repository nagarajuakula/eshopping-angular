import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../shared/services/cart.service';
import { Product } from '../../shared/models/product';
import { ProductsService } from '../../products/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: Product[] = [];
  constructor(private cartService: CartService,
              private prodService: ProductsService,
              private router: Router) { }

  ngOnInit(): void {
    const productIds = this.cartService.getCartItems();
    this.getProducts(productIds);
  }
  
  getProducts(productIds: number[])  {
    productIds.forEach(id => {
    this.cartProducts.push(this.prodService.getProduct(id));
  });
  }

  viewProductDetails(productId: number) {
    this.router.navigate(['/products/' + productId], { queryParams: { fromCart: true}});
  }

  removeFromCart(index: number) {
    this.cartProducts = this.cartProducts.filter((product, i) => {
      return i !== index;
    });

    this.cartService.items.splice(index, 1);
  }
}
