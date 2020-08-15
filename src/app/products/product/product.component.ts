import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from 'src/app/shared/models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup;
  product: Product;
  editMode = false;

  constructor(private router: Router,
              private aRoute: ActivatedRoute,
              public productService: ProductsService) { }

  ngOnInit(): void {
    let productId = +this.aRoute.snapshot.params['id'];
    if(productId) {
      this.editMode = true;
      this.product = this.productService.getProduct(productId);
    } else {
      this.product = { id: 0, name: null, description: null, category: null, author: null, price: 0};
    }

    this.productForm = new FormGroup({
      id: new FormControl(this.product.id),
      name: new FormControl(this.product.name, [Validators.required]),
      description: new FormControl(this.product.description, [Validators.required]),
      category: new FormControl(this.product.category, [Validators.required]),
      author: new FormControl(this.product.author),
      price: new FormControl(this.product.price)
    });
  }

  addOrEditProduct() {
    if(this.editMode) {
      // this.productForm.controls.id.setValue(this.product.id);
      this.productService.updateProduct(this.productForm.value);
    } else {
      this.productService.addProduct(this.productForm.value);
    }
    this.router.navigate(["/"], { relativeTo: this.aRoute});
  }

}
