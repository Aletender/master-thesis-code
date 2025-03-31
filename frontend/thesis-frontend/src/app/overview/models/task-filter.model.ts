import {TaskStatus} from './task.model';

export interface TaskFilter {
  status?: TaskStatus[]; // Mehrfachauswahl
  startDate?: string; // ISO-Date
  endDate?: string;
  searchTerm?: string; // z.B. ID oder Kundennamen
}
