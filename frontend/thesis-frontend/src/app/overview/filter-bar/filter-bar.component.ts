import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStatus, TASK_STATUS_META } from '../models/task.model';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, MatChipsModule, FormsModule],
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent {
  @Output() statusFilterChange = new EventEmitter<TaskStatus[]>();
  @Output() textFilterChange = new EventEmitter<string>();

  allStatuses: TaskStatus[] = [
    TaskStatus.READY4PICKING,
    TaskStatus.IN_PICKING,
    TaskStatus.PICKED,
    TaskStatus.IN_PACKING,
    TaskStatus.PACKED,
    TaskStatus.R4_PICKUP,
    TaskStatus.PICKED_UP,
    TaskStatus.CANCELED
  ];

  selectedStatuses = new Set<TaskStatus>();
  searchText: string = '';

  toggleStatus(status: TaskStatus): void {
    if (this.selectedStatuses.has(status)) {
      this.selectedStatuses.delete(status);
    } else {
      this.selectedStatuses.add(status);
    }

    this.statusFilterChange.emit(Array.from(this.selectedStatuses));
  }

  isSelected(status: TaskStatus): boolean {
    return this.selectedStatuses.has(status);
  }

  getLabel(status: TaskStatus): string {
    return TASK_STATUS_META[status]?.label ?? status;
  }

  getColorClass(status: TaskStatus): string {
    return TASK_STATUS_META[status]?.colorClass ?? 'status-gray';
  }

  onSearchTextChange(): void {
    this.textFilterChange.emit(this.searchText.trim().toLowerCase());
  }
}
