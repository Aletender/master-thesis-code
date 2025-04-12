import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {NgForOf, NgIf, SlicePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {ProductCardComponent} from '../../../shared/product-card/product-card.component';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-customer-upsell',
  templateUrl: './customer-upsell.component.html',
  styleUrls: ['./customer-upsell.component.scss'],
  imports: [
    MatButton,
    NgForOf,
    MatDivider,
    MatIcon,
    NgIf,
    ProductCardComponent,
    SlicePipe,
    MatChipsModule,
  ],
  standalone: true
})
export class CustomerUpsellComponent {
  customerName = 'Max Mustermann';
  customerAge = 31;
  customerGender = 'male';

  pets = [
    { gender: 'female', type: 'Hund', breed: 'Golden Retriever', name: 'Buddy', age: 5 },
    { gender: 'male', type: 'Katze', breed: 'Perser', name: 'Milo', age: 3 }
  ];

  products = [
    {
      name: 'Hochwertiges Premium-Hundefutter mit natürlichen Zutaten',
      price: 24.99,
      imageUrl: 'https://picsum.photos/200/300',
      quantity: 1,
      hints: ['Empfohlen für aktive Hunde', 'Reich an Proteinen', 'Kundenfavorit']
    },
    {
      name: 'Ergonomisches Katzenbett mit weichem Memory-Schaum',
      price: 49.99,
      imageUrl: 'https://picsum.photos/200/300',
      quantity: 2,
      hints: ['Passt perfekt in kleine Räume', 'Leicht zu reinigen', 'Beliebt bei Katzenbesitzern']
    },
    {
      name: 'Spielzeug-Set für Haustiere: Interaktive Bälle und Kauspielzeug',
      price: 34.99,
      imageUrl: 'https://picsum.photos/200/300',
      quantity: 5,
      hints: ['Fördert die Aktivität', 'Langlebiges Material', 'Ideal für Welpen']
    },
    {
      name: 'Luxuriöser Kratzbaum mit mehreren Ebenen und Verstecken',
      price: 89.99,
      imageUrl: 'https://picsum.photos/200/300',
      quantity: 3,
      hints: ['Perfekt für große Katzen', 'Stabile Konstruktion', 'Inklusive Spielzeug']
    }
  ];

  showAllPets = false;

  constructor(private bottomSheetRef: MatBottomSheetRef<CustomerUpsellComponent>) {}

  close(): void {
    this.bottomSheetRef.dismiss();
  }

  toggleShowAllPets(): void {
    this.showAllPets = !this.showAllPets;
  }
}
