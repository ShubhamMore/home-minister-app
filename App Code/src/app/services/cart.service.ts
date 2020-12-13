import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: { product: any; quantity: number }[] = [];

  private cartItemsCount = new BehaviorSubject<number>(0);

  getCartItems() {
    return [...this.cartItems];
  }

  getCartItemsCount() {
    return this.cartItemsCount;
  }

  setCartItemCount() {
    let count = 0;
    this.cartItems.forEach((cartItem: { product: any; quantity: number }) => {
      count += +cartItem.quantity;
    });

    this.cartItemsCount.next(count);
  }

  clearCart() {
    this.cartItems = [];
  }

  addProductToCart(product: Product, quantity: number) {
    const cartProductIndex = this.cartItems.findIndex(
      (cartItem: any) => cartItem.product.id === product.id
    );

    if (cartProductIndex >= 0) {
      this.cartItems[cartProductIndex].quantity += quantity;
    } else {
      const newCartItem = { product, quantity };
      this.cartItems.push(newCartItem);
    }

    this.setCartItemCount();
  }

  deleteProductFromCart(productId: any) {
    const cartProductIndex = this.cartItems.findIndex(
      (cartItem: any) => cartItem.product.id === productId
    );

    if (cartProductIndex >= 0) {
      this.cartItems.splice(cartProductIndex, 1);
      this.setCartItemCount();
    }
  }

  constructor(private httpService: HttpService) {}
}
