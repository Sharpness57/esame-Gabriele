import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { CommonModule } from '@angular/common';

interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [CommonModule, RouterModule],
})
export class MenuComponent implements OnInit {
  quantityMap: { [name: string]: number } = {};

  pizzas: Pizza[] = [
    { id: 1, name: 'Margherita', description: 'La classica pizza con pomodoro, mozzarella e basilico fresco.', price: 6.00, img: 'assets/margherita.jpg' },
    { id: 2, name: 'Quattro Formaggi', description: 'Una delizia con mozzarella, gorgonzola, parmigiano e fontina.', price: 7.50, img: 'assets/4formaggi.jpg' },
    { id: 3, name: 'Focaccia', description: 'Soffice focaccia aromatizzata con olio d\'oliva e rosmarino.', price: 4.50, img: 'assets/focaccia.jpg' },
    { id: 4, name: 'Diavola', description: 'Piccante e gustosa, con salame e peperoncino.', price: 7.00, img: 'assets/diavola.jpg' },
    { id: 5, name: 'Capricciosa', description: 'Con prosciutto, funghi, carciofi e olive per veri amanti della pizza.', price: 7.50, img: 'assets/capricciosa.jpg' }
  ];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.pizzas$.subscribe(pizzas => {
      this.quantityMap = {};
      pizzas.forEach(p => this.quantityMap[p.name] = p.qty);
    });
  }

  increase(name: string): void {
    this.cartService.increase(name);
  }

  decrease(name: string): void {
    this.cartService.decrease(name);
  }

  goToPizza(id: number): void {
    this.router.navigate(['/pizze', id]);
  }

  removePizza(name: string): void {
    this.pizzas = this.pizzas.filter(p => p.name !== name);
  }
}
