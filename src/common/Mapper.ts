import { TaskCreateDTO, TaskResponseDTO } from "./DTOs";
import { Task } from "../domain";

export class TaskMapper {
  public static toResponseDTO(task: Task): TaskResponseDTO {
    return {
      id: task.id.value,
      title: task.title.value,
      description: task.description?.value,
      completed: task.completed,
      dueDate: task.dueDate,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  public static toDomain(dto: TaskCreateDTO): Task {
    return Task.create({
      id: dto.id,
      title: dto.title,
      description: dto.description,
      completed: dto.completed,
      dueDate: dto.dueDate,
    });
  }
}