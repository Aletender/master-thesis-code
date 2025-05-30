import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

interface PaketProdukt {
  produkt: Product;
  anzahl: number;
  sku: string;
}

interface Paket {
  id: number;
  produkte: PaketProdukt[];
}

@Component({
  selector: 'app-packing-view',
  templateUrl: './packing-view.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    DragDropModule
  ],
  styleUrls: ['./packing-view.component.scss']
})
export class PackingViewComponent implements OnInit {
  aufgabe!: Task;
  ladeProdukte = false;
  paketListe: Paket[] = [];
  naechstePaketId = 1;
  alleProdukte: PaketProdukt[] = [];

  constructor(
    private aufgabenService: TaskService,
    private produktService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const aufgabenId = params['id'];
      this.ladeAufgabe(aufgabenId);
    });
  }

  ladeAufgabe(aufgabenId: string): void {
    this.aufgabenService.getTask(aufgabenId).subscribe(aufgabe => {
      this.aufgabe = aufgabe;
      this.ladeProdukteFuerAufgabe();
    });
  }

  ladeProdukteFuerAufgabe(): void {
    if (this.aufgabe && Array.isArray(this.aufgabe.products) && this.aufgabe.products.length > 0) {
      // Produkte sind jetzt Objekte { sku, quantity }
      const taskProducts = this.aufgabe.products.filter(
        (p: any) => p && typeof p.sku === 'string' && typeof p.quantity === 'number'
      );
      if (taskProducts.length > 0) {
        this.ladeProdukte = true;
        // Hole Produktdetails anhand der SKUs
        this.produktService.getProductsByTaskProducts(taskProducts).subscribe({
          next: (produkte) => {
            // Mappe die Mengen aus taskProducts auf die Produktobjekte
            const quantityMap: { [sku: string]: number } = {};
            taskProducts.forEach(tp => quantityMap[tp.sku] = tp.quantity);

            this.alleProdukte = produkte.map(p => ({
              produkt: p,
              anzahl: quantityMap[p.sku] || 1,
              sku: p.sku
            }));
            this.paketListe = [
              { id: this.naechstePaketId++, produkte: this.alleProdukte.map(p => ({ ...p })) }
            ];
            this.ladeProdukte = false;
          },
          error: () => {
            this.alleProdukte = [];
            this.ladeProdukte = false;
          }
        });
      }
    }
  }

  drop(event: CdkDragDrop<PaketProdukt[]>, paketIndex: number) {
    if (
      event &&
      typeof paketIndex === 'number' &&
      this.paketListe &&
      this.paketListe[paketIndex] &&
      event.previousContainer &&
      event.container
    ) {
      if (event.previousContainer === event.container) {
        moveItemInArray(this.paketListe[paketIndex].produkte, event.previousIndex, event.currentIndex);
      } else {
        const vorherIndex = this.paketListe.findIndex(
          p => 'packageDropList' + this.paketListe.indexOf(p) === event.previousContainer.id
        );
        const aktuellIndex = paketIndex;
        if (
          vorherIndex !== -1 &&
          aktuellIndex !== -1 &&
          this.paketListe[vorherIndex] &&
          this.paketListe[aktuellIndex]
        ) {
          transferArrayItem(
            this.paketListe[vorherIndex].produkte,
            this.paketListe[aktuellIndex].produkte,
            event.previousIndex,
            event.currentIndex
          );
        }
      }
    }
  }

  paketHinzufuegen() {
    this.paketListe.push({ id: this.naechstePaketId++, produkte: [] });
  }

  paketEntfernen(index: number) {
    if (this.paketListe.length > 1 && this.paketListe[index]) {
      this.paketListe[0].produkte.push(...this.paketListe[index].produkte);
      this.paketListe.splice(index, 1);
    }
  }

  produktSplitten(paketIndex: number, produktIndex: number) {
    if (
      this.paketListe &&
      this.paketListe[paketIndex] &&
      this.paketListe[paketIndex].produkte[produktIndex]
    ) {
      const produkt = this.paketListe[paketIndex].produkte[produktIndex];
      if (produkt.anzahl > 1) {
        produkt.anzahl -= 1;
        this.paketListe[paketIndex].produkte.splice(produktIndex + 1, 0, { ...produkt, anzahl: 1 });
      }
    }
  }

  produktMergen(paketIndex: number, produktIndex: number) {
    if (
      this.paketListe &&
      this.paketListe[paketIndex] &&
      produktIndex > 0
    ) {
      const produkte = this.paketListe[paketIndex].produkte;
      if (produkte[produktIndex].sku === produkte[produktIndex - 1].sku) {
        produkte[produktIndex - 1].anzahl += produkte[produktIndex].anzahl;
        produkte.splice(produktIndex, 1);
      }
    }
  }

  getDropListIds(): string[] {
    return this.paketListe.map((_, idx) => 'packageDropList' + idx);
  }

  zurueckZurUebersicht(): void {
    this.router.navigate(['/']);
  }

  alsVerpacktMarkieren(): void {
    if (this.aufgabe) {
      this.aufgabe.status = TaskStatus.PACKED;
      this.aufgabenService.updateTask(this.aufgabe.taskId, this.aufgabe).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
