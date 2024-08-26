import {Component, OnInit} from '@angular/core';
import CartModel from "../../modals/cartModel";
import {CartService} from "../../services/cart/cart.service";
import ProductModel from "../../modals/productModel";
import {ProductService} from "../../services/product/product.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartItems: CartModel[] = [];
  products: ProductModel[] = [];
  confirmed: boolean = false;

  constructor(private cartService: CartService, private productService: ProductService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items
      this.loadProductDetails();
    })
  }

  loadProductDetails(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  getProductDetails(productId: number): ProductModel | undefined {
    return this.products.find(product => product.id === productId);
  }

  getOrderTotal(): number {
    return this.cartItems.reduce((total, item) => {
      const product = this.getProductDetails(item.productId);
      const price = product ? product.price : 0;
      return total + (item.quantity * price);
    }, 0);
  }

  removeItem(productId: number): void {
    return this.cartService.removeItem(productId);
  }

  confirmOrder(): void {
    this.confirmed = true;
  }

  startNewOrder(): void {
    this.cartService.clearCart();
    this.confirmed = false;
  }
}
