import { PipeTransform, Pipe } from '@angular/core';
import { ProductsService } from 'src/app/products/services/products.service';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
@Pipe({
    name: 'searchByCategory'
})
export class SearchByCategoryPipe implements PipeTransform {
    transform(products: Product[], category: string): Product[] {
        if (category !== 'All') {
            return products.filter(product => {
                return product.id === +category;
            });
        }

        return products;
    }

    constructor(private productService: ProductsService) { }
}