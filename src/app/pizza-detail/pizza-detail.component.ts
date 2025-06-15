import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pizza-detail.component.html',
  styleUrls: ['./pizza-detail.component.css']
})
export class PizzaDetailComponent implements OnInit {
  pizzaId!: number;

  pizzas = [
    { 
      id: 1, 
      name: 'Margherita', 
      price: 6.00, 
      img: 'assets/margherita.jpg',
      ingredients: 'Pomodoro, mozzarella, basilico fresco',
      calories: 320,
      availability: 'Tutto l’anno',
      cookingTime: '10 minuti'
    },
    { 
      id: 2, 
      name: 'Quattro Formaggi', 
      price: 7.50, 
      img: 'assets/4formaggi.jpg',
      ingredients: 'Mozzarella, gorgonzola, parmigiano, fontina',
      calories: 400,
      availability: 'Tutto l’anno',
      cookingTime: '12 minuti'
    },
    { 
      id: 3, 
      name: 'Focaccia', 
      price: 4.50, 
      img: 'assets/focaccia.jpg',
      ingredients: 'Olio d\'oliva, rosmarino',
      calories: 280,
      availability: 'Tutto l’anno',
      cookingTime: '8 minuti'
    },
    { 
      id: 4, 
      name: 'Diavola', 
      price: 7.00, 
      img: 'assets/diavola.jpg',
      ingredients: 'Salame piccante, peperoncino',
      calories: 350,
      availability: 'Tutto l’anno',
      cookingTime: '11 minuti'
    },
    { 
      id: 5, 
      name: 'Capricciosa', 
      price: 7.50, 
      img: 'assets/capricciosa.jpg',
      ingredients: 'Prosciutto, funghi, carciofi, olive',
      calories: 370,
      availability: 'Tutto l’anno',
      cookingTime: '12 minuti'
    }
  ];

  pizza: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pizzaId = Number(params.get('id'));
      this.pizza = this.pizzas.find(p => p.id === this.pizzaId) || null;
    });
  }
}
