import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Observable,
  catchError,
  filter,
  iif,
  map,
  of,
  take,
  tap,
  throwError,
} from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products').pipe(
      catchError((error) => {
        console.error('Error fetching products', error);
        return throwError(
          () => 'Error fetching products; please try again later.'
        );
      })
    );
  }

  searchProduc(query: string): Observable<Product[]> {
    console.log('Entro')
    return this.http.get<Product[]>('https://fakestoreapi.com/products').pipe(
      map((product: Product[]) =>
        product
          .filter((product: Product) =>
            product.title.toUpperCase().includes(query.toUpperCase())
          )
          .slice(0, 3)
      ),
      tap(console.log),
      catchError((error) => {
        console.error('Error fetching products', error);
        return throwError(
          () => 'Error fetching products; please try again later.'
        );
      })
    );
  }

  filterForRating(): Observable<Product[]> {
    return this.http
      .get<Product[]>('https://fakestoreapi.com/products')
      .pipe(map((products) => products));
  }
}
