import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconButton } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatExpansionModule, MatIconButton, MatChipsModule]
})
export class ProductCardComponent {
  @Input() name!: string;
  @Input() description?: string;
  @Input() price?: number;
  @Input() sku!: string;
  @Input() category!: string;
  @Input() brand?: string;
  @Input() stockQuantity?: number;
  @Input() shelfLocation?: string;
  @Input() isColdStorage?: boolean;
  @Input() targetAnimal?: string;
  @Input() recommendedAgeGroup?: string;
  @Input() weightGrams?: number;
  @Input() packSize?: number;
  @Input() imageUrl?: string;
  @Input() tags?: string[];
  @Input() quantity?: number;

  showDetails = false;
}
