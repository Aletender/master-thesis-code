export interface Task {
  id: string;
  customerName: string;
  startDate: string;
  endDate: string;
  status: TaskStatus;
  hasWarning?: boolean;
}

export enum TaskStatus {
  READY4PICKUP = 'READY4PICKUP',
  IN_PICKING = 'IN_PICKING',
  PICKED = 'PICKED',
  IN_PACKING = 'IN_PACKING',
  PACKED = 'PACKED',
  R4_PICKUP = 'R4_PICKUP',
  PICKED_UP = 'PICKED_UP',
  CANCELED = 'CANCELED'
}

export const TASK_STATUS_META: Record<TaskStatus, { label: string; colorClass: string }> = {
  [TaskStatus.READY4PICKUP]: { label: 'Ready 4 Picking', colorClass: 'status-yellow' },
  [TaskStatus.IN_PICKING]: { label: 'In Picking', colorClass: 'status-yellow' },
  [TaskStatus.PICKED]: { label: 'Picked', colorClass: 'status-yellow' },
  [TaskStatus.IN_PACKING]: { label: 'In Packing', colorClass: 'status-blue' },
  [TaskStatus.PACKED]: { label: 'Packed', colorClass: 'status-blue' },
  [TaskStatus.R4_PICKUP]: { label: 'Ready 4 Pickup', colorClass: 'status-green' },
  [TaskStatus.PICKED_UP]: { label: 'Picked Up', colorClass: 'status-green' },
  [TaskStatus.CANCELED]: { label: 'Cancelled', colorClass: 'status-red' }
};
