import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  productList$!: Observable<Product[]>;

  ngOnInit(): void {
    this.getProductCountInCart();
  }

  getProductCountInCart(): void {
    this.productList$ = this.cartService.cart$;
  }

  isOpen():Observable<boolean>{
    return this.cartService.showCart$
  }
}
