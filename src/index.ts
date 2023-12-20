import { Elysia } from "elysia";
import { Task } from "./domain";

const app = new Elysia()
  .get("/", () => {
    const task = Task.create({
      title: "My first task",
      description: "This is my first task",
    });

    return {
      task,
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
