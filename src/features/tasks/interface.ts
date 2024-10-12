export interface Task {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  createdAt?: Date;
}

export type Meta = {
  page: number;
  total: number;
  pageTotal: number;
};

export type Status = 'Not urgent' | 'Due soon' | 'Overdue';
