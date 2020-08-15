import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { CartCalculatorComponent } from './cart-calculator/cart-calculator.component';


@NgModule({
  declarations: [CartComponent, CartCalculatorComponent],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
