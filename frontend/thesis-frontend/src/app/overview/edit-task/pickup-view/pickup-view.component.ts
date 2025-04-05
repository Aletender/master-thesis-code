import { Component, Input } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { HelpSheetComponent } from '../help-sheet/help-sheet.component';
import {MatIcon} from '@angular/material/icon';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-pickup-view',
  templateUrl: './pickup-view.component.html',
  standalone: true,
  styleUrls: ['./pickup-view.component.scss'],
  imports: [MatBottomSheetModule, MatIcon, NgForOf]
})
export class PickupViewComponent {
  @Input() task!: Task;

  checklist = [
    { label: 'Prüfschritt 1', helpText: 'Hilfstext für Prüfschritt 1' },
    { label: 'Prüfschritt 2', helpText: 'Hilfstext für Prüfschritt 2' },
    { label: 'Prüfschritt 3', helpText: 'Hilfstext für Prüfschritt 3' }
  ];

  constructor(private taskService: TaskService, private bottomSheet: MatBottomSheet) {}

  save(): void {
    this.taskService.updateTask(this.task.taskId, this.task).subscribe(() => {
      // Handle successful save
    });
  }

  openBottomSheet(helpText: string): void {
    this.bottomSheet.open(HelpSheetComponent, {
      data: { helpText }
    });
  }
}
