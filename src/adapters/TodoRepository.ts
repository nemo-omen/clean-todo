import { TaskMapper } from "../common/Mapper";
import { TaskCreateDTO, TaskResponseDTO } from "../common/DTOs";
import { Task } from "../domain";


class TodoRepository {
  tasks: Task[] = [];
  public async create(dto: TaskCreateDTO): Promise<TaskResponseDTO> {
    const task = TaskMapper.toDomain(dto);
    this.tasks.push(task);
    return TaskMapper.toResponseDTO(task);
  }

  public async findAll(): Promise<TaskResponseDTO[]> {
    return this.tasks.map((task) => TaskMapper.toResponseDTO(task));
  }

  public async findById(id: string): Promise<TaskResponseDTO | null> {
    const task = this.tasks.find((task) => task.id.value === id);
    if (!task) {
      return null;
    }
    return TaskMapper.toResponseDTO(task);
  }

  // public async update(id: string, dto: TaskCreateDTO): Promise<TaskResponseDTO | null> {
  //   const task = this.tasks.find((task) => task.id.value === id);
  //   if (!task) {
  //     return null;
  //   }
  //   task.update({
  //     title: dto.title,
  //     description: dto.description,
  //     completed: dto.completed,
  //     dueDate: dto.dueDate,
  //   });
  //   return TaskMapper.toResponseDTO(task);
  // }

  public async delete(id: string): Promise<boolean> {
    const task = this.tasks.find((task) => task.id.value === id);
    if (!task) {
      return false;
    }
    this.tasks = this.tasks.filter((task) => task.id.value !== id);
    return true;
  }
}