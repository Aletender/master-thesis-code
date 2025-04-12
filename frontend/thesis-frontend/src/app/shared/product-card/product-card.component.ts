import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductCardComponent {
  @Input() name!: string;
  @Input() price?: number;
  @Input() imageUrl?: string; // Optionales Bild
  @Input() quantity?: number; // Optionale Anzahl
}
