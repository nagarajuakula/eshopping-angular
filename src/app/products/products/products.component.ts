import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductsService } from '../services/products.service';
import { Product } from '../../shared/models/product';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  enabled = false;
  products: Product[] = [];
  selectedCategory: string;
  messageTitle = "No Products found in this category";
  messageDescription = "";
  goToMessage = "Add Product";
  goToLink = "/products/edit-product/new";
  
  constructor(private router: Router,
              private aRoute: ActivatedRoute,
              public productsService: ProductsService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.selectedCategory = "Books";
      this.productsService.getProducts().subscribe(products => {
        this.products = products;
    });
  }

  goToProduct(productId: number) {
    this.router.navigate(['../products/' + productId], { relativeTo: this.aRoute});
  }

  addProductToCart(productId: number) {
    this.cartService.addToCart(productId);
  }

  filterByCategory() {
    if(this.selectedCategory === 'All') {
      return this.products.length;
    } else {
      this.products = this.products.filter(product => {
        return product.category === this.selectedCategory;
      });
    }
  }
}
