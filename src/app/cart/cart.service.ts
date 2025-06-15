import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface PizzaItem {
  name: string;
  qty: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private pizzasSubject = new BehaviorSubject<PizzaItem[]>([]);
  pizzas$ = this.pizzasSubject.asObservable();

  private prices: { [key: string]: number } = {
    'Margherita': 6.0,
    'Quattro Formaggi': 7.5,
    'Focaccia': 4.5,
    'Diavola': 7.0,
    'Capricciosa': 7.5,
  };

  private quantityMap: { [key: string]: number } = {};

  getPrices() {
    return this.prices;
  }

  increase(name: string) {
    this.quantityMap[name] = (this.quantityMap[name] || 0) + 1;
    this.emitPizzas();
  }

  decrease(name: string) {
    if ((this.quantityMap[name] || 0) > 0) {
      this.quantityMap[name]--;
      this.emitPizzas();
    }
  }

  resetCart() {
  this.quantityMap = {};
  this.emitPizzas();
}


  private emitPizzas() {
    const pizzas = Object.entries(this.quantityMap)
      .filter(([_, qty]) => qty > 0)
      .map(([name, qty]) => ({
        name,
        qty,
        price: this.prices[name]
      }));
    this.pizzasSubject.next(pizzas);
  }
}
