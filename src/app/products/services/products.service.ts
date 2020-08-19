import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Product } from 'src/app/shared/models/product';
import { PRODUCTS_API } from 'src/app/shared/constants';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    products: Product[] = [];
    categories: string[] = ["Books", "Electronics", "Groceries"];
    searchTerm;
    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        if (this.products.length !== 0) {
            return of(this.products);
        }
        return this.http.get<Product[]>(PRODUCTS_API)
            .pipe(map(data => {
                this.products = data;
                return this.products;
            }));
    }

    getProduct(id: number): Product {
        return this.products.find(product => {
            return product.id === id
        });
    }

    updateProduct(product: Product) {
        this.http.put<Product>(PRODUCTS_API, product)
            .subscribe(data => {
                let index = this.products.findIndex(prod => prod.id === product.id);
                this.products[index] = product;
            });
    }

    addProduct(product: Product) {
        this.http.post<Product>(PRODUCTS_API, product)
            .subscribe(data => {
                this.products.push(data);
            });
    }

    deleteProduct(productId: number) {
        let reqUrl = PRODUCTS_API + "/" + productId;
        this.http.delete(reqUrl)
            .subscribe(data => {
                console.log(data);
            });
    }
}