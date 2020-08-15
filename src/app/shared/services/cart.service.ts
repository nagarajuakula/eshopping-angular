import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    items: number[] = [];
 
    addToCart(productId: number) {
        this.items.push(productId);
    }

    getCartItems(): number[] {
        return this.items;
    }
 }