import {Component, EventEmitter, Input, Output} from '@angular/core';
import ProductModel from "../../modals/productModel";
import {CartService} from "../../services/cart/cart.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: ProductModel;
  @Input() cartQuantity!: number;

  @Output() addToCart = new EventEmitter<void>();
  @Output() increaseQuantity = new EventEmitter<void>();
  @Output() decreaseQuantity = new EventEmitter<void>();

  onAddToCart() {
    this.addToCart.emit();
  }

  onIncreaseQuantity() {
    this.increaseQuantity.emit();
  }

  onDecreaseQuantity() {
    this.decreaseQuantity.emit();
  }
}
