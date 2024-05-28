import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, iif, of } from 'rxjs';
import { Product } from '../models/product.interface';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<Product[]>([]);
  private showCart = new BehaviorSubject<boolean>(false);

  cart$ = this.cartSubject.asObservable();
  showCart$ = this.showCart.asObservable();



  openCart(){
    this.showCart.next(!this.showCart.value);
  }

  addToCart(producto: Product) {
    const currentCart = this.cartSubject.value;
    this.cartSubject.next([...currentCart, producto]);
  }

  removeFromCart(productoId: number) {
    const currentCart = this.cartSubject.value.filter(
      (p) => p.id !== productoId
    );
    this.cartSubject.next(currentCart);
  }

  isAddedToCart(id: number): Observable<boolean> {
    return this.cart$.pipe(
      switchMap((products: Product[]) =>
        iif(
          () => !!products.find((product: Product) => product.id === id),
          of(true),
          of(false)
        )
      ),
    
    );
  }
}
