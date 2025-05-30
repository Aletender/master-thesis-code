import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../../shared/product-card/product-card.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-picking-view',
  templateUrl: './picking-view.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ProductCardComponent,
    MatButtonModule,
    MatCheckbox,
    MatCard,
    MatIcon
  ],
  styleUrls: ['./picking-view.component.scss']
})
export class PickingViewComponent implements OnInit {
  task!: Task;
  productQuantities: { [sku: string]: number } = {};
  products: Product[] = [];
  loadingProducts = false;
  pickedSkus: Set<string> = new Set();

  constructor(
    private taskService: TaskService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const taskId = params['id'];
      this.loadTask(taskId);
    });
  }

  loadTask(taskId: string): void {
    this.taskService.getTask(taskId).subscribe(task => {
      this.task = task;
      this.prepareProductQuantities();
      this.loadProducts();
    });
  }

  prepareProductQuantities(): void {
    this.productQuantities = {};
    if (Array.isArray(this.task?.products)) {
      for (const p of this.task.products) {
        if (p && typeof p.sku === 'string' && typeof p.quantity === 'number') {
          this.productQuantities[p.sku] = p.quantity;
        }
      }
    }
  }

  loadProducts(): void {
    if (Array.isArray(this.task?.products) && this.task.products.length > 0) {
      const taskProducts = this.task.products.filter((p: any) => p && typeof p.sku === 'string');
      if (taskProducts.length > 0) {
        this.loadingProducts = true;
        this.productService.getProductsByTaskProducts(taskProducts).subscribe({
          next: (products) => {
            this.products = products;
            this.loadingProducts = false;
          },
          error: () => {
            this.products = [];
            this.loadingProducts = false;
          }
        });
      }
    }
  }

  togglePicked(sku: string): void {
    if (this.pickedSkus.has(sku)) {
      this.pickedSkus.delete(sku);
    } else {
      this.pickedSkus.add(sku);
    }
  }

  isPicked(sku: string): boolean {
    return this.pickedSkus.has(sku);
  }

  get allPicked(): boolean {
    return (
      this.products.length > 0 &&
      this.products.every(product => this.pickedSkus.has(product.sku))
    );
  }

  getQuantity(sku: string): number {
    return this.productQuantities[sku] ?? 0;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  markAsPicked(): void {
    this.task.status = TaskStatus.PICKED;
    this.taskService.updateTask(this.task.taskId, this.task).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
