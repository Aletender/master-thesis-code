import {Component, OnInit, Inject, Optional} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Task} from '../../models/task.model';
import {Customer, CustomerService} from '../../services/customer.service';
import {TaskService} from '../../services/task.service';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {NgIf, NgFor, KeyValuePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {ProductCardComponent} from '../../../shared/product-card/product-card.component';
import {MatIcon} from '@angular/material/icon';
import {Product} from '../../models/product.model';
import {ProductService} from '../../services/product.service';
import {MatDivider} from '@angular/material/list';


@Component({
  selector: 'app-customer-upsell',
  templateUrl: './customer-upsell.component.html',
  styleUrls: ['./customer-upsell.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, MatCardModule, MatProgressSpinnerModule, MatButton, MatTableModule, ProductCardComponent, MatIcon, MatDivider]
})
export class CustomerUpsellComponent implements OnInit {
  task?: Task;
  customer?: Customer;
  isLoading = true;

  products: Product[] = [];
  currentProductIndex = 0;
  loadingProducts = false;
  productReasons = [
    {
      "sku": "4000158777002",
      "reason": "Hochwertiges Nassfutter für Rocky, ideal für ausgewachsene Hunde."
    },
    {
      "sku": "8711231104634",
      "reason": "Zahnpflege-Gel für Rocky, unterstützt die tägliche Zahnhygiene."
    },
    {
      "sku": "4054651002752",
      "reason": "Intelligenzspielzeug für Rocky, fördert die geistige Auslastung."
    }
  ];

  petComments: { [name: string]: string } = {
    'Rocky': 'Fragen Sie nach Rockys Lieblingsspielzeug oder ob er das neue Intelligenzspielzeug schon ausprobiert hat! Vielleicht freut sich Rocky auch über ein neues Zahnpflege-Gel.',
    'Luna': 'Wie kommt Luna mit dem neuen Futter zurecht? Gibt es eine Lieblingssorte? Fragen Sie auch nach ihrem Lieblingsplatz.',
    'Nala': 'Hat Nala schon das neue Kaninchenfutter probiert? Vielleicht interessiert sie sich auch für frisches Heu.'
  };

  customerComment: string = 'Kennen Sie schon unser Bonusprogramm? Oder möchten Sie sich für unseren Newsletter anmelden? Sprechen Sie den Kunden auf aktuelle Aktionen oder persönliche Beratung an!';

  get currentProduct() {
    return this.products[this.currentProductIndex];
  }

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private customerService: CustomerService,
    private productService: ProductService,
    @Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data?: { taskId?: string }
  ) {
  }

  ngOnInit(): void {
    console.log("init")
    if (this.data?.taskId) {
      this.loadTaskAndCustomer(this.data.taskId);
      return;
    }
    this.route.params.subscribe(params => {
      const taskId = params['id'];
      if (taskId) {
        this.loadTaskAndCustomer(taskId);
      } else {
        this.isLoading = false;
        this.loadUpsellProducts();
      }
    });
  }

  loadTaskAndCustomer(taskId: string): void {
    this.isLoading = true;
    this.taskService.getTask(taskId).subscribe({
      next: (task) => {
        this.task = task;
        if (task && task.customerId) {
          this.customerService.getCustomerById(task.customerId).subscribe({
            next: (customer) => {
              this.customer = customer;
              this.isLoading = false;
              this.loadUpsellProducts();
            },
            error: () => {
              this.customer = undefined;
              this.isLoading = false;
              this.loadUpsellProducts();
            }
          });
        } else {
          this.customer = undefined;
          this.isLoading = false;
          this.loadUpsellProducts();
        }
      },
      error: () => {
        this.task = undefined;
        this.customer = undefined;
        this.isLoading = false;
        this.loadUpsellProducts();
      }
    });
  }

  loadUpsellProducts() {
    console.log("Loading upsell products");
    this.loadingProducts = true;
    const skus = this.productReasons.map(p => p.sku);
    this.productService.getProductsBySkus(skus).subscribe({
      next: (products) => {
        this.products = products.map(prod => {
          const found = this.productReasons.find(p => p.sku === prod.sku);
          return found ? {...prod, reason: found.reason} : prod;
        });
        this.currentProductIndex = 0;
        this.loadingProducts = false;
      },
      error: () => {
        this.products = [];
        this.loadingProducts = false;
      }
    });
  }

  close(): void {
    window.history.back();
  }

  getPetIcon(species?: string): string {
    switch ((species || '').toLowerCase()) {
      case 'hund':
      case 'dog':
        return '🐶';
      case 'katze':
      case 'cat':
        return '🐱';
      case 'vogel':
      case 'bird':
        return '🐦';
      case 'kaninchen':
      case 'rabbit':
        return '🐰';
      case 'pferd':
      case 'horse':
        return '🐴';
      case 'fisch':
      case 'fish':
        return '🐟';
      default:
        return '🐾';
    }
  }

  showPrevProduct() {
    if (this.products.length === 0) return;
    if (this.currentProductIndex > 0) {
      this.currentProductIndex--;
    } else {
      this.currentProductIndex = this.products.length - 1;
    }
  }

  showNextProduct() {
    if (this.products.length === 0) return;
    if (this.currentProductIndex < this.products.length - 1) {
      this.currentProductIndex++;
    } else {
      this.currentProductIndex = 0;
    }
  }
}
