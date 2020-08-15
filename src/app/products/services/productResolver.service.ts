import { Injectable } from '@angular/core';
import { ProductsModule } from '../products.module';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { Product } from 'src/app/shared/models/product';
import { ProductsService } from './products.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductResolver implements Resolve<Product[]>{

    constructor(private router: Router, 
        private productService: ProductsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | import("rxjs").Observable<Product[]> | Promise<Product[]> {
        if(this.productService.products.length !== 0) {
            return this.productService.products;
        }
        return this.productService.getProducts()
        .pipe(map(data => {
            return data;
        }));
    }
}