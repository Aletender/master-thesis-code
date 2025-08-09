import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { HelpSheetComponent } from '../help-sheet/help-sheet.component';
import { MatIcon } from '@angular/material/icon';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {CustomerUpsellComponent} from '../customer-upsell/customer-upsell.component';

@Component({
  selector: 'app-pickup-view',
  templateUrl: './pickup-view.component.html',
  standalone: true,
  imports: [
    MatIcon,
    NgForOf,
    MatButton,
    MatIconButton,
    NgIf,
    NgClass,
    // Hinzufügen des NgForOf-Moduls
  ],
  styleUrls: ['./pickup-view.component.scss']
})
export class PickupViewComponent implements OnInit {
  task!: Task;
  checklist: ChecklistItem[] = [
    {
      label: 'Kunde identifizieren',
      helpText: `
# Kunde identifizieren
Um sicherzustellen, dass das Paket an die richtige Person übergeben wird, überprüfen Sie die Identität des Kunden:
- **Ausweis prüfen**: Vergewissern Sie sich, dass der Name auf dem Ausweis mit dem Namen in der Bestellung übereinstimmt.
- **Kundenkarte akzeptieren**: Falls vorhanden, kann auch eine Kundenkarte verwendet werden.
- **Fragen Sie höflich nach weiteren Informationen**, falls Zweifel bestehen.
`
    },
    {
      label: 'Paket holen',
      helpText: `
# Paket holen
Gehen Sie in den Lagerbereich und holen Sie das Paket:
- **Lagerplatz prüfen**: Überprüfen Sie den Lagerplatz anhand der Bestellinformationen.
- **Paket scannen**: Nutzen Sie den Scanner, um sicherzustellen, dass das richtige Paket ausgewählt wurde.
- **Beschädigungen prüfen**: Achten Sie darauf, ob das Paket äußerlich beschädigt ist.
`
    },
    {
      label: 'Paket prüfen',
      helpText: `
# Paket prüfen
Bevor das Paket übergeben wird, führen Sie eine gründliche Prüfung durch:
- **Inhalt überprüfen**: Öffnen Sie das Paket nur, wenn der Kunde dies wünscht.
- **Vollständigkeit sicherstellen**: Stellen Sie sicher, dass alle Artikel enthalten sind.
- **Beschädigungen dokumentieren**: Falls Schäden vorliegen, notieren Sie diese und informieren Sie den Kunden.
`
    },
    {
      label: 'Empfohlene Produkte anzeigen. (Cross & Upselling Assistent)',
      action: () => this.openUpsellSheet()
    },
    {
      label: 'Abschluss bestätigen',
      helpText: `
# Abschluss bestätigen
Schließen Sie den Vorgang ab:
- **Status aktualisieren**: Markieren Sie die Aufgabe als abgeschlossen.
- **Kunden informieren**: Teilen Sie dem Kunden mit, dass der Vorgang erfolgreich abgeschlossen wurde.
- **Feedback einholen**: Fragen Sie den Kunden nach Feedback, falls dies Teil des Prozesses ist.
`
    }
  ];

  readonly TaskStatus = TaskStatus;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private bottomSheet: MatBottomSheet
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
    });
  }

  openBottomSheet(helpText: string): void {
    this.bottomSheet.open(HelpSheetComponent, {
      data: { helpText }
    });
  }

  cancel(): void {
    this.router.navigate(['/overview']);
  }

  complete(): void {
    this.task.status = this.TaskStatus.PICKED_UP;
    this.taskService.updateTask(this.task.taskId, this.task).subscribe(() => {
      this.router.navigate(['/overview']);
    });
  }

  openUpsellSheet(): void {
    this.bottomSheet.open(CustomerUpsellComponent, {
      data: { taskId: this.task?.taskId }
    });
  }
}


interface ChecklistItem {
  label: string;
  helpText?: string;
  action?: () => void;
}
