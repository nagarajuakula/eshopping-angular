import { Component, OnInit } from '@angular/core';

import { CartService } from '../../shared/services/cart.service';
import { ProductsService } from 'src/app/products/services/products.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  totalPrice = 0;
  constructor(public cartService: CartService,
              private productService: ProductsService) {}

    ngOnInit() {
      this.cartService.items.forEach( item => {
        let product = this.productService.getProduct(item);
        this.products.push(product);
        this.totalPrice += product.price});
    }

}
