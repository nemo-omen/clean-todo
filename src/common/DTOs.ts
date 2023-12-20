export interface TaskResponseDTO {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskCreateDTO {
  id?: string;
  title: string;
  description?: string;
  completed?: boolean;
  dueDate?: Date;
}