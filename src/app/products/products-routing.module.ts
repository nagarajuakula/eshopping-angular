import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product/product.component';
import { ProductResolver } from './services/productResolver.service';
import { AuthGuardService } from '../shared/services/auth-guard.service';

const productRoutes: Routes = [
    { path: "", component: ProductsComponent },
    {
        path: "edit-product/new",
        component: ProductComponent,
    },
    {
        path: "edit-product/:id", 
        component: ProductComponent,
        canActivate: [AuthGuardService],
        resolve: { product: ProductResolver }
    },
    {
        path: ":id",
        component: ProductDetailsComponent,
        resolve: { product: ProductResolver }
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(productRoutes)
    ],
    exports: [RouterModule]
})
export class ProductsRoutingModule {

}