import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
    name: 'search'
})
export class SearchFilter implements PipeTransform {
    transform(products: Product[], searchTerm: any): Product[] {
        if(!searchTerm) {
            return products;
        }

        searchTerm = searchTerm.toLocaleLowerCase();
        return products.filter(product => {
            return product.name.toLocaleLowerCase().includes(searchTerm) || 
            product.description.toLocaleLowerCase().includes(searchTerm);
        });
    }
    
}