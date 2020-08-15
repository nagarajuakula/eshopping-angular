import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsComponent } from './products/products.component';
import { ProductsRoutingModule } from './products-routing.module'
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchByCategoryPipe } from '../shared/pipes/searchByCategory.pipe';
import { ProductComponent } from './product/product.component';
import { NoProductFoundComponent } from './no-product-found/no-product-found.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailsComponent,
    SearchByCategoryPipe,
    ProductComponent,
    NoProductFoundComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule
    // SharedModule
  ],
  providers: [  ]
})
export class ProductsModule { }
