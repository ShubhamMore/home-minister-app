import { Product } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpService } from './shared-services/http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    new Product(
      '0',
      'Homemade Masale',
      '../../../assets/homemade-masale.jpeg',
      'Aloo Paratha, Poha, Snack Box, Dry fruits, Shira, Vada',
      350
    ),
    new Product(
      '1',
      'Kurta & Leggings',
      '../../../assets/kurta-and-leggings.jpeg',
      'Kurta and leggings homemade with best materials!',
      500
    ),
    new Product(
      '2',
      'Leather Bags',
      '../../../assets/leather-bag.jpg',
      'Shantai enterprise bags made from pure leather easy to carry',
      750
    ),
    new Product(
      '3',
      'Swatis Home Cook Food',
      '../../../assets/swatis-home-cook-food.jpg',
      'Paneer makhani.., fresh panner mixed with cashew paste and masala',
      350
    ),
    new Product(
      '4',
      'SD Masale',
      '../../../assets/sd-masale.jpeg',
      'Dhana-Jeera powder, Tikha powder, Haldi powder, Kolhpuri masala',
      650
    ),
  ];

  constructor(private httpService: HttpService) {}

  getProducts() {
    return [...this.products];
  }
}
