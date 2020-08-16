import { PipeTransform, Pipe } from '@angular/core';

import { Product } from '../models/product';

@Pipe({
    name: 'searchByCategory'
})
export class SearchByCategoryPipe implements PipeTransform {
    transform(products: Product[], category: string): Product[] {
        if (category !== 'All') {
            return products.filter(product => {
                return product.category === category;
            });
        }

        return products;
    }
}