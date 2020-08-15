import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-cart-calculator',
  templateUrl: './cart-calculator.component.html',
  styleUrls: ['./cart-calculator.component.css']
})
export class CartCalculatorComponent implements  OnChanges {

  @Input() products: Product[];
  totalPrice = 0;
  constructor() { }

  // ngOnInit(): void {
  //   this.products.forEach(product => {
  //      this.totalPrice += product.price
  //     });
  // }

  ngOnChanges() {
    const prods = this.products;
    this.totalPrice = 0;
    prods.forEach(product => {
      this.totalPrice += product.price
     });
  }

}
