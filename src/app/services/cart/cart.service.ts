import { Injectable } from '@angular/core';
import CartModel from "../../modals/cartModel";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartModel[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {}

  getCartItems() {
    return this.cartItems$;
  }

  addToCart(productId: number) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentItems.push({ id: currentItems.length + 1, productId, quantity: 1 });
    }

    this.cartItems.next([...currentItems]);
  }

  increaseQuantity(productId: number) {
    const currentItems = this.cartItems.value;
    const item = currentItems.find((item) => item.productId === productId);

    if (item) {
      item.quantity++;
      this.cartItems.next([...currentItems]);
    }
  }

  decreaseQuantity(productId: number) {
    const currentItems = this.cartItems.value;
    const item = currentItems.find((item) => item.productId === productId);

    if (item && item.quantity > 0) {
      item.quantity--;

      if (item.quantity === 0) {
        this.cartItems.next(currentItems.filter((i) => i.productId !== productId));
      } else {
        this.cartItems.next([...currentItems]);
      }
    }
  }

  removeItem(productId: number) {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter((item) => item.productId !== productId);
    this.cartItems.next(updatedItems);
  }

  clearCart() {
    this.cartItems.next([]);
  }
}
