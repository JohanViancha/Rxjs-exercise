import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { Observable, filter, find, iif, map, switchMap, tap } from 'rxjs';
import { Product } from '../../models/product.interface';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductsService);
  cartService = inject(CartService);
  isDisabledCart$!: Observable<boolean>;
  productList$!: Observable<Product[]>;

  ngOnInit(): void {
    this.getProducts();
  }

  addProductToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getProducts() {
    this.productList$ = this.productService.getAllProducts();
  }

  isAddedToCart(id: number): Observable<boolean> {
    return this.cartService.isAddedToCart(id);
  }
}
