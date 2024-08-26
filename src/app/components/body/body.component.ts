import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import ProductModel from "../../modals/productModel";
import {ProductService} from "../../services/product/product.service";
import {CartService} from "../../services/cart/cart.service";
import CartModel from "../../modals/cartModel";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent implements OnInit {
  products$: Observable<ProductModel[]> =  of([]);
  cartItems$: Observable<CartModel[]> = of([]);

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit():void {
    this.products$ = this.productService.getProducts();
    this.cartItems$ = this.cartService.getCartItems();
  }

  getQuantity(productId: number): number {
    let quantity = 0;
    this.cartItems$.subscribe(items => {
      const item = items.find(item => item.productId === productId);
      quantity = item ? item.quantity : 0;
    }).unsubscribe();
    return quantity;
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId);
  }

  increaseQuantity(productId: number) {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }
}
