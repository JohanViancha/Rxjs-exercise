import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  Observable,
  Subscription,
  debounceTime,
  iif,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Product } from '../../models/product.interface';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartService = inject(CartService);
  productService = inject(ProductsService);

  products$!: Observable<Product[]>;
  countProduct: number = 0;
  searchControl = new FormControl<string>('');
  subscriptionCartProduct!: Subscription;

  ngOnInit(): void {
    this.findProduct();
    this.setProductCountInCart();
  }

  findProduct(): void {
    this.products$ = this.searchControl.valueChanges.pipe(
      tap(console.log),
      debounceTime(300),
      switchMap((query: string) =>
        iif(
          () => query.length > 0,
          this.productService.searchProduc(query),
          of([])
        )
      )
    );
  }

  setProductCountInCart(): void {
    this.subscriptionCartProduct = this.cartService.cart$
      .pipe(tap((products: Product[]) => (this.countProduct = products.length)))
      .subscribe();
  }

  openCart() {
    this.cartService.openCart();
  }

  ngOnDestroy(): void {
    this.subscriptionCartProduct.unsubscribe();
  }
}
