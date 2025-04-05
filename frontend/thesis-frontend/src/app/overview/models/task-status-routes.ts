import { TaskStatus } from './task.model';

export const TASK_STATUS_ROUTES: Record<TaskStatus, string> = {
  [TaskStatus.READY4PICKING]: 'edit/picking',
  [TaskStatus.IN_PICKING]: 'edit/picking',
  [TaskStatus.PICKED]: 'edit/packing',
  [TaskStatus.IN_PACKING]: 'edit/packing',
  [TaskStatus.PACKED]: 'edit/pickup',
  [TaskStatus.R4_PICKUP]: 'edit/pickup',
  [TaskStatus.PICKED_UP]: 'edit/pickup',
  [TaskStatus.CANCELED]: 'edit/picking'
};
