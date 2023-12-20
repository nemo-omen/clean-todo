import { randomUUID } from "crypto";

type IdProps = {
  value: string;
};

class Id {
  private readonly props: IdProps;

  constructor (props: IdProps) {
    this.props = props;
  }

  public static create(id?: string): Id {
    if (!id) {
      return new Id({ value: randomUUID() });
    }
    return new Id({ value: id });
  }

  public get value(): string {
    return this.props.value;
  }

  public equals(id: Id): boolean {
    return this.value === id.value;
  }
}

type TitleProps = {
  value: string;
};

class Title {
  props: TitleProps;
  constructor (props: { value: string; }) {
    this.props = props;
  }

  public static create(title: string): Title {
    if (!title) {
      throw new Error("Title is required");
    }
    if (title.length > 50) {
      throw new Error("Title is too long");
    }
    if (title.length < 3) {
      throw new Error("Title is too short");
    }
    if (!title.match(/^[a-zA-Z0-9 ]+$/)) {
      throw new Error("Title must be alphanumeric");
    }
    return new Title({ value: title });
  }

  public get value(): string {
    return this.props.value;
  }

  public equals(title: Title): boolean {
    return this.value === title.value;
  }
}

type DescriptionProps = {
  value: string;
};

class Description {
  private readonly props: DescriptionProps;

  constructor (props: { value: string; }) {
    this.props = props;
  }

  public static create(description: string): Description {
    if (description.length > 500) {
      throw new Error("Description is too long");
    }
    return new Description({ value: description });
  }

  public get value(): string {
    return this.props.value;
  }

  public equals(description: Description): boolean {
    return this.value === description.value;
  }

}

type TaskProps = {
  id: Id;
  title: Title;
  description?: Description;
  completed?: boolean;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
};

interface TaskCreateDTO {
  id?: string;
  title: string;
  description?: string;
  completed?: boolean;
  dueDate?: Date;
}

export class Task {
  private readonly props: TaskProps;

  constructor (props: TaskProps) {
    this.props = props;
  }

  public static create(dto: TaskCreateDTO): Task {
    if (!dto.title) {
      throw new Error("Title is required");
    }

    const task = new Task({
      id: dto.id ? Id.create(dto.id) : Id.create(),
      title: Title.create(dto.title),
      description: dto.description ? Description.create(dto.description) : undefined,
      completed: dto.completed ? dto.completed : false,
      dueDate: dto.dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return task;
  }

  public get id(): Id {
    return this.props.id;
  }

  public get title(): Title {
    return this.props.title;
  }

  public get description(): Description | undefined {
    return this.props.description;
  }

  public get completed(): boolean | undefined {
    return this.props.completed;
  }

  public get dueDate(): Date | undefined {
    return this.props.dueDate;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}