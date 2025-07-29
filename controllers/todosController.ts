import { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { Todo } from "../models/todo.ts";

const todos: Todo[] = [
  { id: "1", text: "Leer Deno" },
  { id: "2", text: "Maak demo project" },
];

export const getTodos = (ctx: RouterContext<"/todos">) => {
  ctx.response.body = { todos };
};

export const addTodo = async (ctx: RouterContext<"/todos">) => {
  const body = await ctx.request.body({ type: "json" }).value;
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    text: body.text,
  };
  todos.push(newTodo);
  ctx.response.status = 201;
  ctx.response.body = { message: "Todo toegevoegd", todo: newTodo };
};

export const deleteTodo = (ctx: RouterContext<"/todos/:id">) => {
  const id = ctx.params.id;
  const index = todos.findIndex((todo) => todo.id === id);
  if (index > -1) {
    todos.splice(index, 1);
  }
  ctx.response.body = { message: `Todo met id ${id} verwijderd` };
};

export const updateTodo = async (ctx: RouterContext<"/todos/:id">) => {
  const id = ctx.params.id;
  const body = await ctx.request.body({ type: "json" }).value;

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    ctx.response.status = 404;
    ctx.response.body = { message: "Todo niet gevonden" };
    return;
  }

  todo.text = body.text ?? todo.text;

  ctx.response.body = {
    message: `Todo met id ${id} geüpdatet`,
    todo,
  };
};