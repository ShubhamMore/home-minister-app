import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  quantity: number[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();

    this.products.forEach((product: any) => {
      this.quantity.push(1);
    });
  }

  changeQuantity(quantity: any, i: number) {
    this.quantity[i] = +quantity < 1 ? 1 : +quantity;
  }

  addToCart(product: Product, i: number) {
    this.cartService.addProductToCart(product, this.quantity[i] < 1 ? 1 : this.quantity[i]);
  }
}
