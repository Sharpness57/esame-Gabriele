import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { NgFor, NgIf, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, NgIf, DecimalPipe],
  styleUrls: ['./cart.component.css'],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  selectedPizzas: { name: string; qty: number; price: number }[] = [];
  totalPrice: number = 0;
  totalQty: number = 0;
  pizzaNames: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.pizzas$.subscribe(pizzas => {
      this.selectedPizzas = pizzas;
      this.totalPrice = pizzas.reduce((acc, item) => acc + item.qty * item.price, 0);
      this.totalQty = pizzas.reduce((acc, item) => acc + item.qty, 0);
      this.pizzaNames = pizzas.map(p => p.name).join(', ');
    });
  }

  checkout() {
    alert(`Grazie per il tuo acquisto di ${this.totalQty} pizza/e!\n\nTotale: €${this.totalPrice.toFixed(2)}`);
    this.cartService.resetCart();
    this.router.navigate(['/']);
  }
}
