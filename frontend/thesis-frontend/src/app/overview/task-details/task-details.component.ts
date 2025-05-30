import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { MatButton } from '@angular/material/button';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, MatButton],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  products: Product[] = [];
  productQuantities: { [sku: string]: number } = {};
  loading = false;
  error?: string;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<TaskDetailsComponent>,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // products ist jetzt eine Liste von Objekten { sku, quantity }
    const taskProducts: { sku: string, quantity: number }[] = Array.isArray(this.task?.products)
      ? this.task.products.filter((p: any) => p && typeof p.sku === 'string' && typeof p.quantity === 'number')
      : [];
    console.log(this.task)
    // Map für Mengen anlegen
    this.productQuantities = {};
    for (const p of taskProducts) {
      this.productQuantities[p.sku] = p.quantity;
    }

    if (taskProducts.length > 0) {
      this.loading = true;
      this.productService.getProductsByTaskProducts(taskProducts).subscribe({
        next: (products) => {
          this.products = products;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Produkte konnten nicht geladen werden';
          this.loading = false;
        }
      });
    } else {
      this.products = [];
    }
  }

  close(): void {
    this.bottomSheetRef.dismiss();
  }

  get task() {
    return this.data?.task;
  }

  getQuantity(sku: string): number {
    return this.productQuantities[sku] ?? 0;
  }
}
